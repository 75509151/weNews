import bcrypt
from sqlalchemy import(
	Column,
	Integer,
	Text,
)


from .meta import Base


class User(Base):
	"""docstring for User"""
	__tablename__ = "users"
	id = Column(Integer, primary_key=True, autoincrement=True)
	name = Column(Text, nullable=False, unique=True)
	password = Column(Text, nullable=False)
	sex = Column(Integer, nullable=False, default=1)

	def set_password(self, pw):
		self.password = pw

	def check_password(self, pw):
		if not pw and pw == self.password:
			return True
		return False