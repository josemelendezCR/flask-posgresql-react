from flask import Flask, send_from_directory
from flask_cors import CORS
from routes.teams_routes import router
from utils.db import db
from flask_sqlalchemy import SQLAlchemy
from flask_swagger_ui import get_swaggerui_blueprint

app = Flask(__name__)
CORS(app)

# Configure SWAGGER
@app.route('/static/<path:path>')
def send_static(path):
  return send_from_directory('static', path)

SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'
SWAGGERUI_BLUEPRINT = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "Team Role API"
    }
)

app.register_blueprint(SWAGGERUI_BLUEPRINT, url_prefix=SWAGGER_URL)


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

