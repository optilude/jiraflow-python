from pyramid.view import view_defaults

from ..resources.analysis import Analysis

@view_defaults(context=Analysis, request_method='GET', permission='sdi.view', renderer='json')
class AnalysisView(object):
    """Base class for analysis request views.
    """

    def __init__(self, context, request):
        self.context = context
        self.request = request

    def get_cached(self):
        if self.request.params.get('forceUpdate', False) != False:
            return None

        cache = self.context.cache
        return cache.get(self.context.refresh_interval)

    def update_cache(self, value):
        cache = self.context.cache
        cache.set(value)
        return value
