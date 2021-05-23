from flask_wtf import FlaskForm
from sqlalchemy import or_
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(_, field):
    user = User.query.filter(or_(User.username == field.data, User.email ==
                                 field.data)).first()
    if user:
        raise ValidationError("User is already registered.")


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), user_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
