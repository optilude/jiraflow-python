from pyramid.config import Configurator

from substanced.db import root_factory

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings, root_factory=root_factory)
    config.include('substanced')
    config.add_static_view(name='static', path='retail/static', cache_max_age=3600)

    # Routing table
    config.add_route('api/user', '/api/user')
    config.add_route('api/user/login', '/api/user/login')
    config.add_route('api/user/logout', '/api/user/logout')
    config.add_route('api/user/password', '/api/user/password')

    config.add_route('api/instances', '/api/instances')
    config.add_route('api/instances/instance', '/api/instances/{id}')


    config.scan()
    return config.make_wsgi_app()
