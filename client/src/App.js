import AddTeamRole from "./components/AddTeamRole";
import TeamRoleList from "./components/TeamRoleList";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <AddTeamRole />
      <TeamRoleList />
      <ToastContainer />
    </>
  );
}

export default App;
