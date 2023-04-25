from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-cart')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)

    cart = db.relationship('Cart', backref='user')
    products = association_proxy('cart', 'product')

    
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    @validates('username')
    def validate_username(self, key, value):
        if len(value) < 4:
            raise ValueError("Username must be at least 4 characters long.")
        return value

    def __repr__(self):
        return f'User{self.username}, ID {self.id}'
    

class Cart(db.Model, SerializerMixin):
    __tablename__ = 'carts'

    serialize_rules = ('-cart_products', '-products')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    is_ordered = db.Column(db.Boolean)

    cart_products = db.relationship('CartProduct', backref='cart')
    products = association_proxy('cart_products', 'product')

    def __repr__(self):
        return f'<Cart {self.id}>'
   
class Product(db.Model, SerializerMixin):
    __tablename__ = 'products'

    serialize_rules = ('-cart_products', '-carts')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable = False)
    category = db.Column (db.String)
    description = db.Column(db.String)
    price = db.Column(db.Float, nullable = False)
    image_url = db.Column(db.String, nullable=False)

    cart_products = db.relationship('CartProduct', backref = 'product')
    carts = association_proxy('cart_products', 'cart')

    def __repr__(self):
        return f'<Product {self.name}>'
    

class CartProduct(db.Model, SerializerMixin):
    __tablename__ = 'cart_products'

    serialize_rules = ('-cart', '-product')

    id = db.Column(db.Integer, primary_key = True)
    cart_id = db.Column(db.Integer, db.ForeignKey('carts.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    quantity = db.Column(db.Integer, nullable = False, default = 1)

    def __repr__(self):
        return f'<CartProduct {self.id}>'





































# metadata = MetaData(naming_convention={
#     "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
#     "uq": "uq_%(table_name)s_%(column_0_name)s",
#     "ck": "ck_%(table_name)s_%(constraint_name)s",
#     "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
# })

# db = SQLAlchemy(metadata=metadata)