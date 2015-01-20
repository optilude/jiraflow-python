import json

from pyramid.view import view_config

# Helpers for building JSON state structures for React to render

def build_user_state(request):
    # TODO: Replace dummy data with real database lookups
    return {
        "email": "john@example.org",
        "name": "John Smith",
        "roles": ()
    }

def build_jira_instances_state(request):
    # TODO: Replace dummy data with real database lookups
    return [
        {
            "title": "Project Snowflake",
            "url": "https://snowflake.atlassian.net",
            "selected": True
        }, {
            "title": "Acme Corp",
            "url": "https://acme.atlassian.net",
            "selected": False
        }, {
            "title": "Internal projects",
            "url": "https://jira.acmecorp.com",
            "selected": False
        },
    ]

def build_analysis_state(request):
    # TODO: Replace dummy data with real database lookups
    return [
        {
            "title": "Cumulative flow",
            "type": "cfd",
            "selected": False,
        }, {
            "title": "Control chart",
            "type": "control_chart",
            "selected": True,
        }, {
            "title": "Delivery forecast",
            "type": "delivery_forecast",
            "selected": False,
        },
    ]

def build_state(request):
    return {
        "user": build_user_state(request),
        "jiraInstances": build_jira_instances_state(request),
        "analysis": build_analysis_state(request),
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

