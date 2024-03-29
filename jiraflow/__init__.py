from pyramid.config import Configurator

from substanced.db import root_factory

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings, root_factory=root_factory)
    config.include('substanced')
    config.add_static_view(name='static', path='retail/static', cache_max_age=3600)
    config.scan()
    return config.make_wsgi_app()
