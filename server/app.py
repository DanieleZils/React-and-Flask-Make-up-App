# Standard library imports

# Remote library imports
from flask import Flask, request, make_response, jsonify
from flask_migrate import Migrate
from flask_restful import Api, Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app
from models import db



if __name__ == '__main__':
    app.run(port=5555, debug=True)