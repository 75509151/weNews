from pyramid.config import Configurator
from pyramid.renderers import JSONP

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)
    config.include('pyramid_jinja2')
    config.include('pyramid_mako')
    config.include('.models')
    config.include('.routes')
    config.add_renderer('jsonp', JSONP(param_name='callback'))
    config.scan()
    return config.make_wsgi_app()
