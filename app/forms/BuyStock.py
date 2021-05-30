from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import ValidationError, DataRequired, NumberRange


class BuyStockForm(FlaskForm):
    symbol = StringField('symbol', validators=[DataRequired()])
    shares = IntegerField('shares', validators=[DataRequired(),
        NumberRange(min=1, message="Must provide positive number of shares")])
