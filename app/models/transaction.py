from .db import db
from sqlalchemy.sql import func


class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, server_default=func.now(), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    stock = db.Column(db.Text, nullable=False)
    price = db.Column(db.Numeric(scale=2), nullable=False)
    bought = db.Column(db.Integer)
    sold = db.Column(db.Integer)
    total = db.Column(db.Numeric(scale=2), nullable=False)
    holdings = db.Column(db.Integer, db.CheckConstraint('holdings>=0'))
    created_at = db.Column(db.DateTime, server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime, server_default=func.now(), nullable=False)

    user = db.relationship('User', back_populates='transactions')

    def to_dict(self):
        return {
            'id': self.id,
            'timestamp': self.timestamp,
            'user_id': self.user_id,
            'stock': self.stock,
            'price': str(round(self.price, 2)),
            'bought': self.bought,
            'sold': self.sold,
            'total': str(round(self.total, 2)),
            'holdings': self.holdings,
        }
