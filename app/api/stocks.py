from flask import Blueprint
from flask_login import login_required

stock_routes = Blueprint('stocks', __name__)

@stock_routes.route('')
@login_required
def index():
    """
    Show portfolio of stocks
    """
    pass


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
