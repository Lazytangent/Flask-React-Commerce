from flask_wtf import FlaskForm
from wtforms import DecimalField, StringField


class CreateTransaction(FlaskForm):
    timestamp
    user_id
