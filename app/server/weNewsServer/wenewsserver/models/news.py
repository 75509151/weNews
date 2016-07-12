from sqlalchemy import(
    Column,
    Integer,
    Text,
)

from .meta import Base


class Category(Base):
    """docstring for Category"""
    __tablename__ = "category"
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(Text, nullable=True)

    def __init__(self, title):
        self.title = title


class News(object):
    """docstring for News"""
    __tablename__ = "news"
    id = Column(Integer, primary_key=True, autoincrement=True)
    
    def __init__(self, title, auth):
        super(News, self).__init__()
        self.arg = arg
