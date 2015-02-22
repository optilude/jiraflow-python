import colander

from pyramid.view import view_defaults, view_config
from pyramid.httpexceptions import (
    HTTPBadRequest,
    HTTPNotFound,
    HTTPConflict,
    HTTPInternalServerError,
)

from substanced.folder import FolderKeyError
from substanced.util import find_catalog

from ...resources import instance as jira_instance

@view_defaults(route_name="api/instances", renderer='json')
class InstancesViews(object):

    def __init__(self, context, request):
        self.context = context
        self.request = request

    def instance_json(self, instance):

        # XXX: The id may not be unique enough if the user has access to more
        # than one instance with the same short name. We could use a stringified
        # version of the instance's oid, but this makes for nicer urls! It's fine
        # as long as we tie every instance to exactly one user. If we change this,
        # we also ened to change find_instance()'s use of the `name` index below.

        return dict(
            id=instance.name,
            title=instance.title,
            url=instance.url,
            username=instance.username,
            password=instance.password
        )

    @view_config(request_method='GET')
    def get(self):
        """Return a list of instances available to the current user
        """

        catalog = find_catalog(self.request.context, 'system')

        content_type = catalog['content_type']
        allowed = catalog['allowed']
        name = catalog['name']

        q = content_type.eq('JIRA Instance') & allowed.allows(self.request, 'sdi.view')
        results = q.execute()
        results.sort(name)

        return [self.instance_json(instance) for instance in results]

    @view_config(request_method='POST')
    def post(self):
        """Create a new instance
        """

        body = self.request.json_body
        schema = jira_instance.JIRAInstancePropertySheet.schema

        value = None

        try:
            value = schema.deserialize(body)
        except colander.Invalid, e:
            raise HTTPBadRequest(e)

        instance = self.request.registry.content.create('JIRA Instance', **value)

        # Store against the user's folder
        try:
            self.request.user[instance.instance_name] = instance
        except FolderKeyError, e:
            raise HTTPConflict(instance.instance_name)

        return self.instance_json(instance)

@view_defaults(route_name="api/instances/instance", renderer='json')
class InstanceView(InstancesViews):

    def find_instance(self, instance_id, permission='sdi.view'):
        catalog = find_catalog(self.context, 'system')

        content_type = catalog['content_type']
        allowed = catalog['allowed']
        name = catalog['name']

        q = (
            content_type.eq('JIRA Instance') &
            allowed.allows(self.request, permission) &
            name.eq(instance_id)
        )

        results = q.execute()

        if len(results) == 0:
            raise HTTPNotFound(instance_id)

        if len(results) > 1:
            raise HTTPInternalServerError("More than one record matches %s" % instance_id)

        return results.one()

    @view_config(request_method='GET')
    def get(self):
        """Return a list of instances available to the current user
        """

        instance_id = self.request.matchdict['id']
        return self.instance_json(self.find_instance(instance_id))

    @view_config(request_method='PUT')
    def put(self):
        """Return a list of instances available to the current user
        """

        instance_id = self.request.matchdict['id']
        instance = self.find_instance(instance_id, permission='sdi.edit-properties')

        body = self.request.json_body
        property_sheet = jira_instance.JIRAInstancePropertySheet
        value = None

        # Omitted password means "don't change"
        if 'password' not in body:
            body['password'] = instance.password

        try:
            value = property_sheet.schema.deserialize(body)
        except colander.Invalid, e:
            raise HTTPBadRequest(e)

        try:
            property_sheet(instance, self.request).set(value)
        except FolderKeyError, e:
            raise HTTPConflict(instance.instance_name)

        return self.instance_json(instance)

    @view_config(request_method='DELETE', renderer='string')
    def delete(self):
        """Return a list of instances available to the current user
        """

        instance_id = self.request.matchdict['id']
        instance = self.find_instance(instance_id, permission='sdi.edit-properties')

        del instance.__parent__[instance.__name__]

        return 'OK'
