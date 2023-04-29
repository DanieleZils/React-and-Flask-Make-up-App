from flask import Flask, request, make_response, jsonify, session 
from sqlalchemy.orm import Session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app
from models import db, User, Cart, CartProduct, Product

app.secret_key = 'your_secret_key'

api = Api(app)

class Home(Resource):
    def get(self):
        return "welcome to flask makeup"

api.add_resource(Home, '/')


class Signup(Resource):

    def post(self):
        data = request.get_json()

        try:
            new_user = User(username=data['username'])
            new_user.password_hash = data['password']
            db.session.add(new_user)
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            return make_response({"error": "Username already exists"}, 422)
        except ValueError as ve:
            return make_response({"error": ve.__str__()}, 422)
        except Exception as e:
            return make_response({"errors": [e.__str__()]}, 422)

        session['user_id'] = new_user.id
        return make_response(new_user.to_dict(), 201)

api.add_resource(Signup, '/signup')

class CheckSession(Resource):

    def get(self):

        if session.get('user_id'):
            
            user = User.query.filter(User.id == session['user_id']).first()
            
            return make_response(user.to_dict(), 200)

        return {}, 204

api.add_resource(CheckSession, '/checksession')

class Login(Resource):
    def post(self):
        data = request.get_json()

        username = data['username']
        password = data['password']

        try:
            user = User.query.filter(User.username == username).first()

            if user is None:
                raise ValueError("Username doesn't exist, you must sign-up")

            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 201

            return {'error': 'Invalid Password'}, 401
        except ValueError as ve:
            return make_response({"error": ve.__str__()}, 404)
        except Exception as e:
            return make_response({"errors": [e.__str__()]}, 422)

api.add_resource(Login, '/login')


class Logout(Resource):

    def delete(self):

        session['user_id'] = None

        return {}, 204
    
api.add_resource(Logout, '/logout')


# Products route
class Products(Resource):
    def get(self):
        try:
            products = Product.query.all()
            return make_response([product.to_dict() for product in products], 200)
        except Exception as e:
            return make_response({"error": str(e)}, 500)

api.add_resource(Products, '/products')

class ProductById(Resource):
    def get(self, id):
        try:
            product = Product.query.filter_by(id=id).first()
            if product:
                return make_response(product.to_dict(), 200)
            return make_response({"error": "Product not found"}, 404)
        except Exception as e:
            return make_response({"error": str(e)}, 500)

api.add_resource(ProductById, '/products/<int:id>')


class CartResource(Resource):
    def get(self):
        user = db.session.get(User, session.get('user_id'))
        is_ordered = request.args.get('is_ordered', default = False, type = str)

        if user :
            is_ordered_value = is_ordered.lower() == 'true'
            cart = Cart.query.filter_by(user_id=user.id, is_ordered=is_ordered_value).first()
            if cart:
                return make_response(cart.to_dict(), 200)
        return make_response({"error": "No cart found"}, 404)
        

    def post(self):
        data = request.get_json()
        product_id = data.get('product_id')

        user = db.session.get(User, session.get('user_id'))
        if not user:
            return make_response({"error": "User not found"}, 404)

        product = db.session.get(Product, product_id)
        if not product:
            return make_response({"error": "Product not found"}, 404)

        try:
            # Find an active cart or create a new one
            cart = Cart.query.filter_by(user_id=user.id, is_ordered=False).first()
            if not cart:
                cart = Cart(user=user, is_ordered=False)  # Ensure is_ordered is set to False
                db.session.add(cart)
                db.session.commit()

            cart_product = CartProduct.query.filter_by(cart_id=cart.id, product_id=product.id).first()

            if cart_product:
                cart_product.quantity += 1
            else:
                cart_product = CartProduct(cart_id=cart.id, product_id=product.id)
                db.session.add(cart_product)

            db.session.commit()
            return make_response(cart.to_dict(), 200)
        except IntegrityError:
            db.session.rollback()
            return make_response({"error": "validation errors"}, 422)
        except Exception as e:
            return make_response({"error": str(e)}, 500)

    def patch(self):
        data = request.get_json()
        cart_product_id = data.get('cart_product_id')
        cart_product = CartProduct.query.filter_by(id=cart_product_id).first()

        if not cart_product:
            return make_response({"error": "CartProduct not found"}, 404)

        try:
            for attr in data:
                setattr(cart_product, attr, data[attr])

            db.session.add(cart_product)
            db.session.commit()

            response_dict = cart_product.to_dict()
            response = make_response(response_dict, 200)
            return response
        except IntegrityError:
            db.session.rollback()
            return make_response({"error": "validation errors"}, 422)
        except ValueError as e:
            return make_response({"error": str(e)}, 400)
        except Exception as e:
            return make_response({"error": str(e)}, 500)

    def delete(self):
        data = request.get_json()
        cart_product_id = data.get('cart_product_id')

        cart_product = CartProduct.query.filter_by(id=cart_product_id).first()
        if cart_product:
            try:
                db.session.delete(cart_product)
                db.session.commit()
                return make_response({}, 204)
            except IntegrityError:
                db.session.rollback()
                return make_response({"error": "An error occurred while deleting the CartProduct"}, 422)
        return make_response({"error": "CartProduct not found"}, 404)

api.add_resource(CartResource, '/cart')

class OrderResource(Resource):
    def post(self):
        user_id = session.get('user_id')
        if user_id:
            user = db.session.get(User, user_id)
            cart = Cart.query.filter_by(user_id=user_id, is_ordered=False).first()
            if cart:
                try:
                    cart.is_ordered = True
                    db.session.commit()

                    #create new empty cart to the user
                    new_cart = Cart(user=user, is_ordered=False)
                    db.session.add(new_cart)
                    db.session.commit()
                    return make_response(cart.to_dict(), 200)
                except IntegrityError:
                    db.session.rollback()
                    return make_response({"error": "An error occurred while updating the cart status"}, 422)
            return make_response({"error": "No cart found"}, 404)
        return make_response({"error": "User not found"}, 404)

api.add_resource(OrderResource, '/order')


if __name__ == '__main__':
    app.run(port=5555, debug=True)