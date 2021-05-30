from flask_login import current_user
from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import ValidationError, DataRequired, NumberRange

from app.api.utils.helpers import lookup_symbol


def enough_money(form, field):
    stock = form['symbol'].data
    shares = field.data
    data = lookup_symbol(stock)
    price = data['price']
    cash = current_user.cash
    if cash < shares * price:
        raise ValidationError("Not enough money to buy this many shares")


class BuyStockForm(FlaskForm):
    symbol = StringField('symbol', validators=[DataRequired()])
    shares = IntegerField('shares', validators=[DataRequired(),
        NumberRange(min=1, message="Must provide positive number of shares"),
        enough_money])
