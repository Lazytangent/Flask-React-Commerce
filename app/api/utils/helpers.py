import requests
import urllib.parse

from app.config import Config


def lookup_symbol(symbol):
    """
    Look up quote for symbol.
    """

    try:
        res = requests.get("https://cloud.iexapis.com/stable/stock/" +
                     f"{urllib.parse.quote_plus(symbol)}/quote?token={Config.API_KEY}")
        res.raise_for_status()
    except requests.RequestException:
        return None

    try:
        quote = res.json()
        return {
            "name": quote["companyName"],
            "price": float(quote["latestPrice"]),
            "symbol": quote["symbol"],
        }
    except (KeyError, TypeError, ValueError):
        return None


def usd(value):
    """
    Format value as USD.
    """
    return f"${value:,.2f}"


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    error_messages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            error_messages.append(f"{field}: {error}")
    return error_messages
