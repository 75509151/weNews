from pyramid.response import Response
from pyramid.view import (
    view_config,
    view_defaults
    )

from utils import Result

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
    EXIST, INVALID, NOEXSIT = range(3)
    def __init__(self, request):
        self.request = request

    @view_config(match_param=("action=sign_in"), renderer='jsonp')
    def sign_in(self):
        return Result(0, "sucess")

    @view_config(match_param=("action=add"), renderer='jsonp')
    def add(self):
        # log_request(self)
        user_name = self.request.POST["user_name"]
        # remember(self.request, user_name)
        # user_name = authenticated_userid(self.request)
        ret = self._check_name_is_exist(user_name)
        log.info("ret %s user_name %s" % (ret, user_name))
        if ret == UserManager.NOEXSIT:
            user_pw = self.request.POST["user_pw"]
            if self._check_password_is_valid(user_pw):
                new_user = User(name=user_name, password= user_pw)
                self.request.dbsession.add(new_user)
                return Result(0, "add success")
        return Result(1, "invalid")

    @view_config(match_param=("action=update"), renderer='jsonp')
    def update(self):
        user_name = self.request.POST["user_name"]
        user = self.get_by_name(user_name)
        if user:
            pass

    @view_config(match_param=("action=login"), renderer="jsonp")
    def login(self):
        user_name = self.request.POST["user_name"]
        pw = self.request.POST["user_pw"]
        if self.check_password(user_name, pw):
            # remember(self.request, user_name)
            return Result(0, "login success", auth_takon="46548754")
        return Result(1, "login failed")

    @view_config(match_param=("action=normal"), request_param=("api=ajax_check_user_exist"), renderer="jsonp")
    def ajax_check_name_is_exist(self):
        """ check user is exist
        @result
           "0":-> goto next.
           "1":-> user name Invalid.
           "2":-> user name doesn't exist.
           "3":-> user have been existed.
           "6":-> add user.
        """
        user_name = self.request.POST["user_name"]
        ret = self._check_name_is_exist(user_name)
        if ret == 0:
            return {"status_code": UserManager.INVALID, "msg": "invalid user name"}
        elif ret == 1:
            return {"status_code": UserManager.NOEXSIT, "msg": "user doesn't exist"}
        else:
            return {"status_code": UserManager.EXIST, "msg": "user name exist"}

    def _check_password_is_valid(self, password):
        '''
            check if password valid
        '''
        if password:
            return True
        return False

    def _check_name_is_exist(self, user_name):
        if not user_name:
            log.info("INVALID %s" % UserManager.INVALID)
            return UserManager.INVALID
        query = self.request.dbsession.query(User)
        one = query.filter(User.name == user_name).first()
        if one:
            log.info("EXIST %s " % UserManager.EXIST)
            return UserManager.EXIST
        else:
            log.info("NOEXSIT %s" % UserManager.NOEXSIT)
            return UserManager.NOEXSIT

    # @view_config(match_param=("action=normal"), request_param=("api=view"), renderer="../templates/sign_in.mako")
    @view_config(match_param=("action=normal"), renderer="../templates/sign_in.mako")
    def view(self):
        return {"title": "welcome to join us", "ref": self.request.route_url("user", action="sign_in")}

    def get_by_name(self, name):
        return self.request.dbsession.query(User).filter(User.name == name).first()

    def check_password(self, name, password):
        user = self.get_by_name(name)
        if not user:
            return False
        return user.password == password
