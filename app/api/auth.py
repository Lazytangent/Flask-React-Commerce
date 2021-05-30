from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user, login_required

from app.forms import LoginForm, SignUpForm, ResetPwdForm
from app.models import db, User
from .utils.helpers import validation_errors_to_error_messages

auth_routes = Blueprint('auth', __name__)


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.filter(User.username == form.data['username']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User()
        form.populate_obj(user)
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401


@auth_routes.route('/resetpwd', methods=['POST'])
@login_required
def resetpwd():
    """
    Reset a user's password
    """
    form = ResetPwdForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        current_user.password = form.data['newpwd']
        db.session.commit()
        return current_user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}
