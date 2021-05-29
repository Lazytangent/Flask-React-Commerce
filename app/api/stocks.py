from flask import Blueprint
from flask_login import login_required, current_user

from app.models import db, Transaction, User
from app.api.utils.helpers import lookup_symbol

stock_routes = Blueprint('stocks', __name__)

@stock_routes.route('')
@login_required
def index():
    """
    Show portfolio of stocks
    """
    hist = Transaction.query.filter(Transaction.user_id ==
        current_user.id).all()
    stock = Transaction.query.filter(Transaction.user_id ==
        current_user.id).distinct(Transaction.stock)
    stocks = [d["stock"] for d in stock]
    prices = {}
    cash = current_user['cash']
    total = cash
    names = {}

    for stock in stocks:
        data = lookup_symbol(stock)
        prices[stock] = data["price"]
        names[stock] = data["name"]

    values = {}
    for row in hist:
        values[row["stock"]] = row["holdings"] * prices[row["stock"]]
        total += values[row["stock"]]

    return {
        hist: hist,
        prices: prices,
        values: values,
        total: total,
        names: names,
        cash: cash,
    }


@stock_routes.route('/buy', methods=['POST'])
@login_required
def buy():
    """
    Buy shares of stock
    """
    pass


@stock_routes.route('/history')
@login_required
def history():
    """
    Show history of transactions
    """
    pass


@stock_routes.route('/quote')
@login_required
def quote():
    """
    Get stock quote
    """
    pass


@stock_routes.route('/sell', methods=['POST'])
@login_required
def sell():
    """
    Sell shares of stock
    """
    pass
