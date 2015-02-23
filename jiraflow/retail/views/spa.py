import json

from pyramid.view import view_config
from pyramid.httpexceptions import HTTPUnauthorized

from . import (
    user,
    instances,
)

# Helpers for building JSON state structures for React to render

def build_user_state(request):
    try:
        return user.UserViews(request.context, request).get()
    except HTTPUnauthorized:
        return None

def build_jira_instances_state(request):
    return instances.InstancesViews(request.context, request).get()

def build_state(request):
    return {
        "user": build_user_state(request),
        "jiraInstances": build_jira_instances_state(request),
    }

# Render the app view with the initial state

@view_config(renderer='templates/spa.pt')
def spa(request):
    """Render the React Single Page App
    """
    state = build_state(request)

    return {
        "json_state": json.dumps(state),
    }

