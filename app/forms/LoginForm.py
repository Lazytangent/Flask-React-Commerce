from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from sqlalchemy import or_
from app.models import User


def user_exists(_, field):
    user = User.query.filter(or_(User.username == field.data, User.email ==
        field.data)).first()
    if not user:
        raise ValidationError("No such user exists")


def password_matches(form, field):
    password = field.data
    user = User.query.filter(or_(User.username == field.data, User.email ==
    field.data)).first()
    if not user:
        raise ValidationError("No such user exists.")
    if not user.check_password(password):
        raise ValidationError("Incorrect password.")


class LoginForm(FlaskForm):
    credential = StringField('credential', validators=[
                           DataRequired(), user_exists])
    password = StringField('password', validators=[
        DataRequired(), password_matches])
