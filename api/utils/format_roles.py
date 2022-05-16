# Helper fuction to format a single role into json format so can be returned in the endpoint
def format_role(role):
  return { "id": role.id, "team": role.team, "role": role.role }

def format_role_list(role_list):
  formatted_list = []
  for role in role_list:
    formatted_list.append(format_role(role))
  return { "roles": formatted_list }