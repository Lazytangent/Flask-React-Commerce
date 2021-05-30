from flask_login import current_user
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, NumberRange, ValidationError

from app.models import Transaction


def enough_stock(form, field):
    stock = form['symbol'].data
    shares = field.data
    transaction = Transaction.query.filter(Transaction.user_id ==
        current_user.id, Transaction.stock ==
        stock).order_by(Transaction.id.desc()).first()
    if shares > transaction.holdings:
        raise ValidationError("Cannot sell more than the amount you have")


class SellForm(FlaskForm):
    symbol = StringField('symbol', validators=[DataRequired()])
    shares = IntegerField('shares', validators=[DataRequired(),
        NumberRange(min=1), enough_stock])
