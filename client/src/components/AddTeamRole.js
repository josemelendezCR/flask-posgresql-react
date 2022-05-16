import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { addRole } from '../features/roles/rolesSlice';
import { toast } from 'react-toastify';

const AddTeamRole = () => {
  const [formData, setFormData] = useState({
    team: '',
    role: '',
  });

  const dispatch = useDispatch();
  const { isError, error, isAdded } = useSelector((state) => state.roles);
  const { team, role } = formData;

  const handleChange = (e) => {
    setFormData(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
      })
    )
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(team === '' || role === '') {
      toast.error('Please enter valid data');
    } else {
      dispatch(addRole({ team, role }));
      setFormData(() => ({
          team: '',
          role: '',
        })
      )
    }
  }  

  useEffect(() => {
    if(isAdded) {
      toast.success('Added Successfully', { autoClose: 500 })
    }

    if(isError && error) {
      toast.error(error, { autoClose: 500 })
    }
  }, [isAdded, isError, error])

  
  return (
    <form autoComplete='off' className='container'>   
      <Grid height="240px" container alignItems="center" flexDirection="column" justifyContent="space-evenly">
        <h3>New Team Role</h3>
        <TextField 
          required
          name="team"
          color="success"
          size='small'
          label="Team name"
          placeholder='Enter the team name'
          onChange={handleChange}
          value={team}
        />
        <TextField 
          required
          name="role"
          color="success"
          size='small'
          label="Role name"
          placeholder='Enter the role name'
          onChange={handleChange}
          value={role}
        />
        <Button onClick={handleSubmit} color="success" variant="contained"> Save </Button>
      </Grid>
    </form>
  );
}

export default AddTeamRole;
