import jira

class JiraOperations(object):
    """Helper class for JIRA operations
    """

    def __init__(self, url, username, password):
        self.client = jira.JIRA(url, basic_auth=(username, password))

