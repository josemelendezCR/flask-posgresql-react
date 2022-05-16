import SearchTeamRole from "./SearchTeamRole";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';

const TeamRoleList = () => {
  const { roles, isLoading, isSuccess } = useSelector((state) => state.roles)

  return (
    <div className="container">
      <SearchTeamRole />  
      { isLoading && <CircularProgress color="success"/> } 
      { isSuccess && roles.length > 0 ?
        <Table>
        <TableHead>
          <TableRow>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Team</TableCell>
            <TableCell align="right">Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {roles.map((role) => 
          <TableRow key={role.id}>
            <TableCell align="right">{role.id}</TableCell>
            <TableCell align="right">{role.team}</TableCell>
            <TableCell align="right">{role.role}</TableCell>
          </TableRow>
        )}
        </TableBody>
      </Table> : 
        <h3>
          There is no role registered for the team searched</h3>        
      }     
    </div>
  )
}

export default TeamRoleList;