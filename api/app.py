from flask import Flask, request, make_response, jsonify, session 
from sqlalchemy.orm import Session
from flask_restful import Api, Resource
from sqlalchemy.exc import IntegrityError
import stripe
import os

# Local imports
from config import app, db, stripe_publishable_key
from models import db, User, Cart, CartProduct, Product

app.secret_key = 'your_secret_key'

api = Api(app)


@app.route("/create-checkout-session", methods=["POST"])
def create_checkout_session():
    data = request.get_json()
    amount = data.get("amount")
    currency = data.get("currency")

    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[
                {
                    "price_data": {
                        "currency": currency,
                        "unit_amount": amount,
                        "product_data": {
                            "name": "Cart total"
                        },
                    },
                    "quantity": 1,
                }
            ],
            mode="payment",
            success_url="http://localhost:3000/order-complete?session_id={CHECKOUT_SESSION_ID}",
            cancel_url="http://localhost:3000/cancel"
        )
        return jsonify({"id": checkout_session.id})
    except Exception as e:
        return jsonify({"error": str(e)}), 400


    
@app.route("/stripe_publishable_key")
def get_stripe_publishable_key():
    return jsonify({"stripe_publishable_key": stripe_publishable_key})


class Home(Resource):
    def get(self):
        return "welcome to flask makeup"

api.add_resource(Home, '/')


class Signup(Resource):

    def post(self):
        data = request.get_json()

        try:
            new_user = User(
                username=data['username'],
                email=data['email'],
                first_name=data['firstName'],
                last_name=data['lastName']
                )
            new_user.password_hash = data['password']
            db.session.add(new_user)
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()
            return make_response({"error": f"Email already exists: {str(e)}"}, 422)
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
            return make_response({"error": str(e)}, 404)

api.add_resource(Products, '/products')

class ProductById(Resource):
    def get(self, id):
        try:
            product = Product.query.filter_by(id=id).first()
            if product:
                return make_response(product.to_dict(), 200)
            return make_response({"error": "Product not found"}, 404)
        except Exception as e:
            return make_response({"error": str(e)}, 400)

api.add_resource(ProductById, '/products/<int:id>')

class FeaturedProducts(Resource):
    def get(self):
        try:
            products = Product.query.filter_by(is_featured=True).all()
            return make_response([product.to_dict() for product in products], 200)
        except Exception as e:
            return make_response({"error": str(e)}, 500)

api.add_resource(FeaturedProducts, '/featured-products')

class LipMakeup(Resource):

    def get(self):
        try:
            products = Product.query.filter_by(category='lip').all()
            return make_response([product.to_dict() for product in products], 200)
        except Exception as e:
            return make_response({"error": str(e)}, 400)
        
api.add_resource(LipMakeup, '/lip')

class EyeMakeup(Resource):

    def get(self):

        try:
            products = Product.query.filter_by(category='eye').all()
            return make_response([product.to_dict() for product in products], 200)
        except Exception as e:
            return make_response({"error": str(e)}, 400)
        
api.add_resource(EyeMakeup, '/eye')

class FaceMakeup(Resource):

    def get(self):
        try:
            products = Product.query.filter_by(category='face').all()
            return make_response([product.to_dict() for product in products], 200)
        except Exception as e:
            return make_response({"error": str(e)}, 400)

api.add_resource(FaceMakeup, '/face')

class CartResource(Resource):
    def get(self):
        user = db.session.get(User, session.get('user_id'))
        is_ordered = request.args.get('is_ordered', default = False, type = str)

        if user :
            is_ordered_value = is_ordered.lower() == 'true'
            cart = Cart.query.filter_by(user_id=user.id, is_ordered=is_ordered_value).first()
            if cart:
                #fetch related cart_products
                cart_products = CartProduct.query.filter_by(cart_id=cart.id).all()
                cart.cart_products = cart_products
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


class PastOrdersResource(Resource):

    def get(self):

        user_id = session.get('user_id')
        user = db.session.get(User, user_id)

        if user:
            if user:
                query = Cart.query.filter_by(user_id=user_id, is_ordered=True)
                last_order_only = request.args.get('last_order_only', default=False, type=bool)

                if last_order_only:
                    query = query.order_by(Cart.id.desc()).limit(1)

                past_orders = query.all()

            for order in past_orders:
                cart_products = CartProduct.query.filter_by(cart_id=order.id).all()
                order.cart_products = cart_products

            return make_response([order.to_dict() for order in past_orders], 200)
        return make_response({"error": "User not found"}, 404)
    
api.add_resource(PastOrdersResource, '/past-orders')
                

if __name__ == '__main__':
    app.run(port=5555, debug=True)