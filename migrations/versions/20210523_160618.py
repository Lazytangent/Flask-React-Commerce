"""empty message

Revision ID: e5644485cc34
Revises: 
Create Date: 2021-05-23 16:06:18.464202

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e5644485cc34'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.Text(), nullable=False),
    sa.Column('hashed_password', sa.Text(), nullable=False),
    sa.Column('cash', sa.Numeric(scale=2), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('transactions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('timestamp', sa.DateTime(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('stock', sa.Text(), nullable=False),
    sa.Column('price', sa.Numeric(scale=2), nullable=False),
    sa.Column('bought', sa.Integer(), nullable=True),
    sa.Column('sold', sa.Integer(), nullable=True),
    sa.Column('total', sa.Numeric(scale=2), nullable=False),
    sa.Column('holdings', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('transactions')
    op.drop_table('users')
    # ### end Alembic commands ###
