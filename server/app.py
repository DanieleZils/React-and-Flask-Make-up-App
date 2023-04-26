from flask import Flask, request, make_response, jsonify, session 
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

if __name__ == '__main__':
    app.run(port=5555, debug=True)