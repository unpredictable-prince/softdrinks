"""add category to products

Revision ID: b2e4f5a6c7d8
Revises: 9ac1b4c20cbe
Create Date: 2026-10-10 11:38:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b2e4f5a6c7d8'
down_revision: Union[str, None] = '9ac1b4c20cbe'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Add category column with default 'CARBONATED'
    op.add_column(
        'products',
        sa.Column('category', sa.String(length=50), nullable=False, server_default='CARBONATED')
    )


def downgrade() -> None:
    op.drop_column('products', 'category')
