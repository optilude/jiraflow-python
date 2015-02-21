import colander

from pyramid.view import view_config
from pyramid.httpexceptions import (
    HTTPBadRequest,
    HTTPNotFound,
    HTTPInternalServerError,
)

from substanced.util import find_catalog

from ... import resources

def instance_json(request, instance):

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

def find_instance(request, instance_id, permission='sdi.view'):
    catalog = find_catalog(request.context, 'system')

    content_type = catalog['content_type']
    allowed = catalog['allowed']
    name = catalog['name']

    q = (
        content_type.eq('JIRA Instance') &
        allowed.allows(request, permission) &
        name.eq(instance_id)
    )

    results = q.execute()

    if len(results) == 0:
        raise HTTPNotFound(instance_id)

    if len(results) > 1:
        raise HTTPInternalServerError("More than one record matches %s" % instance_id)

    return results.one()

@view_config(route_name="api/instances", request_method='GET', renderer='json')
def get_instances(request):
    """Return a list of instances available to the current user
    """

    catalog = find_catalog(request.context, 'system')

    content_type = catalog['content_type']
    allowed = catalog['allowed']
    name = catalog['name']

    q = content_type.eq('JIRA Instance') & allowed.allows(request, 'sdi.view')
    results = q.execute()
    results.sort(name)

    return [instance_json(request, instance) for instance in results]

@view_config(route_name="api/instances", request_method='POST', renderer='json')
def create_instance(request):
    """Create a new instance
    """

    body = request.json_body
    schema = resources.JIRAInstancePropertySheet.schema

    value = None

    try:
        value = schema.deserialize(body)
    except colander.Invalid, e:
        raise HTTPBadRequest(e)

    instance = request.registry.content.create('JIRA Instance', **value)

    # Store against the user's folder
    request.user[instance.instance_name] = instance

    return instance_json(request, instance)

@view_config(route_name="api/instances/instance", request_method='GET', renderer='json')
def get_instance(request):
    """Return a list of instances available to the current user
    """

    instance_id = request.matchdict['id']
    return instance_json(request, find_instance(request, instance_id))

@view_config(route_name="api/instances/instance", request_method='PUT', renderer='json')
def update_instance(request):
    """Return a list of instances available to the current user
    """

    instance_id = request.matchdict['id']
    instance = find_instance(request, instance_id, permission='sdi.edit-properties')

    body = request.json_body
    property_sheet = resources.JIRAInstancePropertySheet
    value = None

    # Omittd password menas 'don't change
    if 'password' not in body:
        body['password'] = instance.password

    try:
        value = property_sheet.schema.deserialize(body)
    except colander.Invalid, e:
        raise HTTPBadRequest(e)

    property_sheet(instance, request).set(value)

    return instance_json(request, instance)

@view_config(route_name="api/instances/instance", request_method='DELETE', renderer='string')
def delete_instance(request):
    """Return a list of instances available to the current user
    """

    instance_id = request.matchdict['id']
    instance = find_instance(request, instance_id, permission='sdi.edit-properties')

    del instance.__parent__[instance.__name__]

    return 'OK'
