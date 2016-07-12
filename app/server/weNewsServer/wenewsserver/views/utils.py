import json


class Result(object):
    """docstring for Result"""
    def __init__(self, status_code=0, msg="", **kw):
        self.status_code = status_code
        self.msg = msg
        self.data = kw


    def __json__(self, request):
        return {"status_code": self.status_code, "msg": self.msg,
            "data": self.data}
