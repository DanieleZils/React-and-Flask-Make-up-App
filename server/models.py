from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property


from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-password_hash', '-cart')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)

    cart = db.relationship('Cart', backref='user')
    products = association_proxy('cart', 'product')


    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        if len(password) < 8:
            raise ValueError("Password must be at least 8 characters long.")
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
    
    
    @validates('email')
    def validate_email(self, key, value):
        if "@" not in value or not value.endswith(".com"):
            raise ValueError("Invalid email address.")
        return value
    
    
    @validates('first_name', 'last_name')
    def validate_name(self, key, value):
        if len(value) < 1:
            raise ValueError(f"Please provide first and last name.")
        return value

    def __repr__(self):
        return f'User{self.username}, ID {self.id}'
    

class Cart(db.Model, SerializerMixin):
    __tablename__ = 'carts'

    serialize_rules = ('-cart_products', '-products')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    is_ordered = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    cart_products = db.relationship('CartProduct', backref='cart')
    products = association_proxy('cart_products', 'product')

    
    def to_dict(self):
        cart_dict = {
        'id': self.id,
        'user_id': self.user_id,
        'is_ordered': self.is_ordered,
        'created_at': self.created_at,
        'updated_at': self.updated_at,
        'product_quantities': {cart_product.product.id: cart_product.quantity for cart_product in self.cart_products}
    }
        if hasattr(self, 'cart_products'):
            cart_dict['cart_products'] = [cp.to_dict() for cp in self.cart_products]
        return cart_dict
   
class Product(db.Model, SerializerMixin):
    __tablename__ = 'products'

    serialize_rules = ('-cart_products', '-carts')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable = False)
    category = db.Column (db.String)
    description = db.Column(db.String)
    price = db.Column(db.Float, nullable = False)
    image_url = db.Column(db.String, nullable=False)
    is_featured = db.Column(db.Boolean, default=False)

    cart_products = db.relationship('CartProduct', backref = 'product')
    carts = association_proxy('cart_products', 'cart')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'description': self.description,
            'price': self.price,
            'image_url': self.image_url,
            'is_featured': self.is_featured
        }
    

class CartProduct(db.Model, SerializerMixin):
    __tablename__ = 'cart_products'

    serialize_rules = ('-cart', '-product', 'quantity')

    id = db.Column(db.Integer, primary_key = True)
    cart_id = db.Column(db.Integer, db.ForeignKey('carts.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    quantity = db.Column(db.Integer, nullable = False, default = 1)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    @validates('quantity')
    def validate_quantity(self, key, value):
        if value < 1:
            raise ValueError("Quantity must be at least 1.")
        return value
    
    def to_dict(self):
        return {
            'id': self.id,
            'product': self.product.to_dict(),
            'quantity': self.quantity
        }

    
    




































