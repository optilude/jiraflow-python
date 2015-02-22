from pyramid.view import view_config
from ..constants import AnalysisTypes

from .utils import AnalysisView

class BurnupView(AnalysisView):
    """Burnup graph analysis data
    """

    @view_config(name=AnalysisTypes.burnup)
    def get(self):

        # TODO: Implement burnup fetch and processing

        cached_value = self.get_cached()
        if cached_value is not None:
            return cached_value

        value = {
            'series': [(1, 1), (2, 5)]
        }

        return self.update_cache(value)
