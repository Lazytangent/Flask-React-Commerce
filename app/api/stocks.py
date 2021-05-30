from flask import Blueprint, request
from flask_login import login_required, current_user

from app.forms import BuyStockForm, SellStockForm
from app.models import db, Transaction, User
from .utils.helpers import lookup_symbol, validation_errors_to_error_messages

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
        'hist': hist,
        'prices': prices,
        'values': values,
        'total': total,
        'names': names,
        'cash': cash,
    }


@stock_routes.route('/buy', methods=['POST'])
@login_required
def buy():
    """
    Buy shares of stock
    """
    form = BuyStockForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        stock = form['symbol'].data
        shares = form['shares'].data
        holdings = shares
        prev_transaction = Transaction.query.filter(Transaction.user_id ==
            current_user.id, Transaction.stock == stock).order_by(
            Transaction.id.desc()).first()
        if prev_transaction:
            holdings = shares + prev_transaction.holdings
        data = lookup_symbol(stock)
        price = data['price']
        total = -1 * price * shares
        transaction = Transaction(
            user_id=current_user.id,
            stock=stock,
            price=price,
            bought=shares,
            sold=0,
            total=total,
            holdings=holdings
        )
        db.session.add(transaction)
        db.session.commit()
        return transaction.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@stock_routes.route('/history')
@login_required
def history():
    """
    Show history of transactions
    """
    hist = Transaction.query.filter(Transaction.user_id ==
                                    current_user.id).all()
    stocks = [d['stock'] for d in hist]
    names = {}

    for stock in stocks:
        quote = lookup_symbol(stock)
        names[stock] = quote['name']

    return {
        'history': hist,
        'names': names,
    }


@stock_routes.route('/quote')
@login_required
def quote():
    """
    Get stock quote
    """
    stock = request.args.get('stock')
    quote = lookup_symbol(stock)

    if quote == None:
        return {'errors': ['You need a real stock symbol']}, 400

    return { 'quote': quote }


@stock_routes.route('/sell', methods=['POST'])
@login_required
def sell():
    """
    Sell shares of stock
    """
    form = SellStockForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        symbol = form['symbol'].data
        shares = form['shares'].data

        info = Transaction.query.filter(Transaction.user_id ==
            current_user.id, Transaction.stock == symbol).distinct(
            Transaction.stock).order_by(
            Transaction.id.desc()).all()
        print(info)
        return {}
    return {}
