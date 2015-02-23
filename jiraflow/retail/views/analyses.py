import colander

from pyramid.view import view_defaults, view_config
from pyramid.httpexceptions import (
    HTTPBadRequest,
    HTTPConflict,
    HTTPNotFound,
)

from substanced.folder import FolderKeyError

from ...resources import analysis as resource
from .utils import find_instance

@view_defaults(route_name="api/analyses", renderer='json')
class AnalysesViews(object):

    def __init__(self, context, request):
        self.context = context
        self.request = request

    def analysis_json(self, analysis):
        return dict(
            id=analysis.analysis_name,
            title=analysis.analysis,
            description=analysis.description,
            type=analysis.type,
            refresh_interval=analysis.refreshInterval,
            query=analysis.query,
            parameters=analysis.parameters
        )

    def find_instance(self, instance_id, permission='sdi.view'):
        return find_instance(self.context, self.request, instance_id, permission)

    @view_config(request_method='GET')
    def get(self):
        """Return a list of instances available to the current user
        """

        instance_id = self.request.matchdict['instance_id']
        instance = self.find_instance(instance_id)

        return [self.analysis_json(analysis) for analysis in instance.values() if isinstance(analysis, resource.Analysis)]

    @view_config(request_method='POST')
    def post(self):
        """Create a new analysis
        """

        body = self.request.json_body
        schema = resource.AnalysisPropertySheet.schema

        value = None

        try:
            value = schema.deserialize(body)
        except colander.Invalid, e:
            raise HTTPBadRequest(e)

        analysis = self.request.registry.content.create('Analysis', **value)

        # Store against the user's folder
        try:
            self.request.user[analysis.analysis_name] = analysis
        except FolderKeyError, e:
            raise HTTPConflict(analysis.analysis_name)

        return self.analysis_json(analysis)

@view_defaults(route_name="api/analysis", renderer='json')
class AnalysisView(AnalysesViews):

    def find_analysis(self, instance_id, analysis_id):
        instance = self.find_instance(instance_id)
        analysis = instance.get(analysis_id, None)

        if analysis is None or not isinstance(analysis, resource.Analysis):
            raise HTTPNotFound(analysis_id)

    @view_config(request_method='GET')
    def get(self):
        """Return a list of instances available to the current user
        """

        instance_id = self.request.matchdict['instance_id']
        analysis_id = self.request.matchdict['analysis_id']
        analysis = self.find_analysis(instance_id, analysis_id)

        return self.analysis_json(analysis)

    @view_config(request_method='PUT')
    def put(self):
        """Return a list of instances available to the current user
        """

        instance_id = self.request.matchdict['instance_id']
        analysis_id = self.request.matchdict['analysis_id']
        analysis = self.find_analysis(instance_id, analysis_id)

        body = self.request.json_body
        property_sheet = resource.AnalysisPropertySheet
        value = None

        try:
            value = property_sheet.schema.deserialize(body)
        except colander.Invalid, e:
            raise HTTPBadRequest(e)

        try:
            property_sheet(analysis, self.request).set(value)
        except FolderKeyError, e:
            raise HTTPConflict(analysis.analysis_name)

        return self.analysis_json(analysis)

    @view_config(request_method='DELETE', renderer='string')
    def delete(self):
        """Return a list of instances available to the current user
        """

        instance_id = self.request.matchdict['instance_id']
        analysis_id = self.request.matchdict['analysis_id']
        instance = self.find_instance(instance_id, permission='sdi.edit-properties')

        del instance[analysis_id]

        return 'OK'
