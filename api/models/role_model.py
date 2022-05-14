from utils.db import db

class Role(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  team = db.Column(db.String(100))
  role = db.Column(db.String(100))

  # Class constructor
  def __init__(self, team, role):
    self.team = team
    self.role = role
    
