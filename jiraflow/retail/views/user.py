from pyramid.view import view_config

from pyramid.security import (
    forget,
    remember
)

from pyramid.httpexceptions import (
    HTTPUnauthorized,
    HTTPBadRequest
)

from substanced.interfaces import IUserLocator
from substanced.principal import DefaultUserLocator
from substanced.event import LoggedIn
from substanced.util import get_oid

def user_json(user):
    return dict(
        id=user.name,
        name=getattr(user, 'fullname', user.name), # may not be set by default
        email=user.email
    )

@view_config(route_name="api/user", request_method='GET', renderer='json')
def get_user(request):
    """Return the current user, or fail with 401 if not logged in
    """

    user = request.user

    if user is None:
        raise HTTPUnauthorized()

    return user_json(user)

@view_config(route_name="api/user", request_method='PUT', renderer='json')
def update_user(request):
    """Update the current user's properties ('name', 'email')
    """

    user = request.user

    if user is None:
        raise HTTPUnauthorized()

    body = request.json_body

    if 'name' in body:
        user.fullname = body['name']
    if 'email' in body:
        user.email = body['email']

    return user_json(user)

@view_config(route_name="api/user/login", request_method='POST', renderer='json')
def login(context, request):
    """Log in with 'username' and 'password'
    """

    body = request.json_body

    if 'username' not in body or 'password' not in body:
        raise HTTPBadRequest()

    username = body['username']
    password = body['password']

    user_locator = request.registry.queryMultiAdapter((context, request), IUserLocator)
    if user_locator is None:
        user_locator = DefaultUserLocator(context, request)

    user = user_locator.get_user_by_login(username)
    if user is None or not user.check_password(password):
        raise HTTPUnauthorized()

    headers = remember(request, get_oid(user))
    request.response.headerlist.extend(headers)

    request.registry.notify(LoggedIn(username, user, context, request))

    return user_json(user)

@view_config(route_name="api/user/logout", request_method='POST', renderer='json')
def logout(request):
    """Log out
    """

    response = request.response
    headers = forget(request)
    response.headerlist.extend(headers)

    return {}

@view_config(route_name="api/user/password", request_method='POST', renderer='json')
def change_password(request):
    """Change from 'oldPassword' to 'newPassword'
    """

    user = request.user

    if user is None:
        raise HTTPUnauthorized()

    body = request.json_body

    if 'oldPassword' not in body or 'newPassword' not in body:
        raise HTTPBadRequest()

    old_password = body['oldPassword']
    new_password = body['newPassword']

    if not user.check_password(old_password):
        raise HTTPUnauthorized()

    user.set_password(new_password)

    return user_json(user)
