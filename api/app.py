from flask import Flask
from flask_cors import CORS
from routes.teams_routes import router
from utils.db import db
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

# Development env database URI
app.config["SQLALCHEMY_DATABASE_URI"] = 'postgresql://postgres:password@localhost:5001/react-flask-posgresql'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

SQLAlchemy(app)

with app.app_context():
  # Before run this the db has to be already created in PosgreSQL
  db.create_all()

# Register the router
app.register_blueprint(router)

if __name__ == "__main__":
  # Debug = true helps to re-run the server everytime there is a change, in development environment
  app.run(debug=True)

