from pyramid.view import view_defaults, view_config

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

@view_defaults(route_name="api/user", renderer='json')
class UserViews(object):

    def __init__(self, context, request):
        self.context = context
        self.request = request

    def user_json(self, user):
        return dict(
            id=user.name,
            name=getattr(user, 'fullname', user.name), # may not be set by default
            email=user.email
        )

    @view_config(request_method='GET')
    def get(self):
        """Return the current user, or fail with 401 if not logged in
        """

        user = self.request.user

        if user is None:
            raise HTTPUnauthorized()

        return self.user_json(user)

    @view_config(request_method='PUT')
    def put(self):
        """Update the current user's properties ('name', 'email')
        """

        user = self.request.user

        if user is None:
            raise HTTPUnauthorized()

        body = self.request.json_body

        if 'name' in body:
            user.fullname = body['name']
        if 'email' in body:
            user.email = body['email']

        return self.user_json(user)

    @view_config(route_name="api/user/login", request_method='POST')
    def login(self):
        """Log in with 'username' and 'password'
        """

        body = self.request.json_body

        if 'username' not in body or 'password' not in body:
            raise HTTPBadRequest()

        username = body['username']
        password = body['password']

        user_locator = self.request.registry.queryMultiAdapter((self.context, self.request), IUserLocator)
        if user_locator is None:
            user_locator = DefaultUserLocator(self.context, self.request)

        user = user_locator.get_user_by_login(username)
        if user is None or not user.check_password(password):
            raise HTTPUnauthorized()

        headers = remember(self.request, get_oid(user))
        self.request.response.headerlist.extend(headers)

        self.request.registry.notify(LoggedIn(username, user, self.context, self.request))

        return self.user_json(user)

    @view_config(route_name="api/user/logout", request_method='POST')
    def logout(self):
        """Log out
        """

        response = self.request.response
        headers = forget(self.request)
        response.headerlist.extend(headers)

        return {}

    @view_config(route_name="api/user/password", request_method='POST')
    def change_password(self):
        """Change from 'oldPassword' to 'newPassword'
        """

        user = self.request.user

        if user is None:
            raise HTTPUnauthorized()

        body = self.request.json_body

        if 'oldPassword' not in body or 'newPassword' not in body:
            raise HTTPBadRequest()

        old_password = body['oldPassword']
        new_password = body['newPassword']

        if not user.check_password(old_password):
            raise HTTPUnauthorized()

        user.set_password(new_password)

        return self.user_json(user)
