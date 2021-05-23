from .db import db


class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=func.now(), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    stock = db.Column(db.Text, nullable=False)
    price = db.Column(db.Numeric(scale=2), nullable=False)
    bought = db.Column(db.Integer)
    sold = db.Column(db.Integer)
    total = db.Column(db.Numeric(scale=2), nullable=False)
    holdings = db.Column(db.Integer, db.CheckConstraint('holdings>=0'))

    user = db.relationship('User', back_populates='transactions')
