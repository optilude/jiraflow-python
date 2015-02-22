class Enum(object):
    """Derive a class from this and set class attributes as enum keys/values
    with titles.
    """

    @classmethod
    def values(cls):
        return [
            getattr(cls, n)
            for n in dir(cls)
            if not (n.startswith('_') or n.endswith('_title') or n in ('items', 'values'))
        ]

    @classmethod
    def items(cls):
        return [
            (getattr(cls, n), getattr(cls, n + '_title', getattr(cls, n)))
            for n in dir(cls)
            if not (n.startswith('_') or n.endswith('_title') or n in ('items', 'values'))
        ]

class AnalysisTypes(Enum):
    """Types of analyses that are available
    """

    burnup = 'burnup'
    burnup_title = 'Burn-up chart'

