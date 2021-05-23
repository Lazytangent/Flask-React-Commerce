import requests
import urllib.parse

from app.config import Config


def lookup(symbol):
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
