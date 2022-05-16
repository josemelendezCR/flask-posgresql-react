import axios from 'axios';

// Don't know why the proxy is not working maybe is because server is running in a virtual env
const API_URL = 'http://localhost:5000/api/roles';

// Add team's role
const addRole = async ({ team, role }) => {
  try {
    const response = await axios.post(`${API_URL}/new`, { team, role });
    return response.data;  
  } catch(err) {
    throw err;   
  }  
}

// Get team roles 
const getTeamRoles = async (team) => {
  const response = await axios.get(`${API_URL}/${team}`);
  if(response.data.error) {
    throw new Error(response.data);
  }
  return response.data
}

const rolesService = {
  addRole,
  getTeamRoles,
}

export default rolesService;