from flask import Flask, request, make_response, jsonify, session 
from flask_migrate import Migrate
from flask_restful import Api, Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app
from models import db, User

app.secret_key = 'your_secret_key'

api = Api(app)

class Home(Resource):
    def get(self):
        return "welcome to flask makeup"

api.add_resource(Home, '/')


class Signup(Resource):

    def post(self):

        username = request.get_json()['username']
        password = request.get_json()['password']

        if username and password:

            new_user = User(username=username)
            new_user.password_hash = password
            db.session.add(new_user)
            db.session.commit()

            session['user_id'] = new_user.id

            return make_response(new_user.to_dict(), 201)
        
        return {'error': '422 Unprocessable Entity'}, 422
    
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

        username = request.get_json()['username']
        password = request.get_json()['password']

        user = User.query.filter(User.username == username).first()

        if user.authenticate(password):

            session['user_id'] = user.id
            return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401

api.add_resource(Login, '/login')


class Logout(Resource):

    def delete(self):

        session['user_id'] = None

        return {}, 204
    
api.add_resource(Logout, '/logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)