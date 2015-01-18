import json

from pyramid.view import view_config

# Helpers for building JSON state structures for React to render

def build_user_state(request):
    return {}

def build_jira_instances_state(request):
    return []

def build_state(request):
    return {
        "user": build_user_state(request),
        "jiraInstances": build_jira_instances_state(request)
    }

# Render the app view with the initial state

@view_config(renderer='templates/spa.pt',)
def spa(request):
    """Render the React Single Page App
    """
    state = build_state(request)

    return {
        "json_state": json.dumps(state),
    }

