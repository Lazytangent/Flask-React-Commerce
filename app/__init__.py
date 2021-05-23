import os

from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import generate_csrf
from flask_login import LoginManager

from .config import Config
from .models import db, User
from .api import auth_routes, stock_routes

app = Flask(__name__)

login = LoginManager(app)


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


app.config.from_object(Config)
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(stock_routes, url_prefix='/api/stocks')

db.init_app(app)
migrate = Migrate(compare_type=True, compare_server_default=True)
migrate.init_app(app, db)
CORS(app)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict'
        if os.environ.get('FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
