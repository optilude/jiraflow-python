from datetime import datetime
from persistent import Persistent

class AnalysisCache(Persistent):
    """A place to store analysis results for a time
    """

    def __init__(self, timeout):
        self.timeout = timeout
        self.last_saved = None
        self.cached = None

    def set(self, value):
        """Set the cached value and update the timestamp
        """
        self.cached = value
        self.last_saved = datetime.utcnow()

    def get(self, timeout=None):
        """Get the saved value unless expired, in which case return None.

        Does not actually clear self.cached, so you can still read it
        if necessary.
        """

        if timeout is None:
            timeout = self.timeout

        if self.cached is None or self.last_saved is None:
            return None

        if datetime.utcnow() - self.last_saved > datetime.timedelta(seconds=timeout):
            return None

        return self.cached
