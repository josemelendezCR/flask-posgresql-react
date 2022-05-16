from flask import Blueprint, request, abort
from models.role_model import Role
from utils.db import db
from utils.format_roles import format_role, format_role_list
from utils.clean_string import clean_string

router = Blueprint('roles', __name__)

@router.route('/api/roles/new', methods=['POST'])
def add_role():
  if request.method == 'POST':
    # Content-type application/json
    team = clean_string(request.json['team'])
    role = clean_string(request.json['role'])
    if(team == '' or role == ''):
      abort(400)

    new_role = Role(team, role)

    # Check if the role has not been registered for the specific team to avoid duplicate data
    # The following filter is equals to Select * from role where team=team AND role=role
    already_exists = db.session.query(Role).filter(Role.team == team, Role.role == role).count() > 0
    if(already_exists):
      abort(400)
    else:   
      db.session.add(new_role)
      db.session.commit()
      return format_role(new_role)

@router.route('/api/roles/<team>', methods=['GET'])
def get_role(team):
  # The following query is equivalent to Select * from role where team=team
  roles_by_team =  db.session.query(Role).filter(Role.team==clean_string(team)).all()

  return format_role_list(roles_by_team)
    
  