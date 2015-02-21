import json

from pyramid.view import view_config
from pyramid.httpexceptions import HTTPUnauthorized

from . import user

# Helpers for building JSON state structures for React to render

def build_user_state(request):
    try:
        user.get_user(request)
    except HTTPUnauthorized:
        return None

def build_jira_instances_state(request):
    # TODO: Replace dummy data with real database lookups
    return [
        {
            "id": "project-snowflake",
            "title": "Project Snowflake",
            "url": "https://snowflake.atlassian.net",
            "userName": "admin"
        }, {
            "id": "acme-corp",
            "title": "Acme Corp",
            "url": "https://acme.atlassian.net",
            "userName": "admin"
        }, {
            "id": "internal-projects",
            "title": "Internal projects",
            "url": "https://jira.acmecorp.com",
            "userName": "admin"
        },
    ]

def build_analysis_state(request):
    # TODO: Replace dummy data with real database lookups
    return [
        {
            "id": "cfd",
            "title": "Cumulative flow",
            "type": "cfd",
        }, {
            "id": "control-chart",
            "title": "Control chart",
            "type": "control_chart",
        }, {
            "id": "delivery-forecast",
            "title": "Delivery forecast",
            "type": "delivery_forecast",
        },
    ]

def build_state(request):
    return {
        "user": build_user_state(request),
        "jiraInstances": build_jira_instances_state(request),
        "analysis": build_analysis_state(request),
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

