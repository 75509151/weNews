from pyramid.response import Response
from pyramid.view import (
    view_config,
    view_defaults
    )
from sqlalchemy.exc import DBAPIError

from ..models import MyModel
from ..models.user  import User
import logging

log = logging.getLogger(__name__)

# TODO: need to add declare for log


def log_request(self):
    log.info("matchdict: %s" % str(self.request.matchdict))
    log.info("request.params: %s type: %s" % (str(self.request.params), type(self.request.params)))
    log.info("request: %s" % str(self.request))


@view_config(route_name='home', renderer='../templates/mytemplate.mako')
def my_view(request):
    try:
        query = request.dbsession.query(MyModel)
        one = query.filter(MyModel.name == 'one').first()
    except DBAPIError:
        return Response(db_err_msg, content_type='text/plain', status=500)
    return {'one': one, 'project': 'weNewsServer'}


@view_defaults(route_name="user")
class UserManager(object):
    def __init__(self, request):
        self.request = request

    @view_config(match_param=("action=sign_in"), renderer='jsonp')
    def sign_in(self):
        log_request(self)
        return {"status_code": 0, "msg": "success"}

    @view_config(match_param=("action=normal"), request_param=("api=ajax_check_user_exist"), renderer="jsonp")
    def ajax_check_user_is_exist(self):
        """ check user is exist
        @result
           "0":-> goto next.
           "1":-> user name Invalid.
           "2":-> user name doesn't exist.
           "3":-> user have been existed.
           "6":-> add user.
        """
        log_request(self)
        user_name = self.request.params.get("user_name", "")
        ret = self._check_user_is_exist(user_name)
        if ret == 0:
            return {"status_code": 1, "msg": "invalid user name"}
        elif ret == 1:
            return {"status_code": 2, "msg": "user doesn't exist"}
        else:
            return {"status_code": 3, "msg": "user name exist"}

    def _check_user_is_exist(self, user_name):
        if not user_name:
            return 0
        query = self.request.dbsession.query(User)
        one = query.filter(User.name == user_name)
        if one:
            return 2
        else:
            return 3

    @view_config(match_param=("action=normal"), request_param=("api=view"), renderer="../templates/sign_in.mako")
    def view(self):
        return {"title": "welcome to join us", "ref": self.request.route_url("user", action="sign_in")}

db_err_msg = """\
Pyramid is having a problem using your SQL database.  The problem
might be caused by one of the following things:

1.  You may need to run the "initialize_weNewsServer_db" script
    to initialize your database tables.  Check your virtual
    environment's "bin" directory for this script and try to run it.

2.  Your database server may not be running.  Check that the
    database server referred to by the "sqlalchemy.url" setting in
    your "development.ini" file is running.

After you fix the problem, please restart the Pyramid application to
try it again.
"""
