from flask_login import current_user
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError


def old_password_validation(_, field):
    if not current_user.check_password(field.data):
        raise ValidationError("Incorrect old password.")


def passwords_do_not_match(form, field):
    oldpwd = form.data['oldpwd']
    if field.data == oldpwd:
        raise ValidationError("Passwords cannot match")


class ResetPwdForm(FlaskForm):
    oldpwd = StringField('oldpwd', validators=[
        DataRequired(), old_password_validation])
    newpwd = StringField('newpwd', validators=[DataRequired(),
        passwords_do_not_match])
