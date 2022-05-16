import {  useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTeamRoles } from '../features/roles/rolesSlice';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const SearchTeamRole = () => {
  const [filter, setFilter] = useState('');

  const dispatch = useDispatch();

  const handleChange = e => setFilter(e.target.value)

  const handleSubmit = e => {
    e.preventDefault();
    if(filter !== '') {   
      dispatch(getTeamRoles(filter));
      setFilter('');
    }
  }

  return (
    <form autoComplete='off'>
      <TextField
          name="filter"
          color="success"
          size='small'
          label="Team name"
          placeholder='Search team roles'
          onChange={handleChange}
          value={filter}
        />
      <Button 
        disabled={filter === ''}
        onClick={handleSubmit} 
        className="custom-btn"
        endIcon={<SearchIcon />} 
        variant="outlined" 
        color="success" 
      />
    </form>
  )
}

export default SearchTeamRole;