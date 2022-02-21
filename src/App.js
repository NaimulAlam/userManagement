import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddUser from './Dashboard/AddUser';
import Alluser from './Dashboard/Alluser';
import Dashboard from './Dashboard/Dashboard';
import PasswordUpdate from './Dashboard/PasswordUpdate';
import Registration from './Dashboard/Registration';
import SignIn from './Dashboard/SignIn';
import UpdateUserInfo from './Dashboard/UpdateUserInfo';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/update-details" element={<UpdateUserInfo />} />
        <Route path="/update-password" element={<PasswordUpdate />} />
        <Route path="/all-user" element={<Alluser />} />
        <Route path="/add-user" element={<AddUser />} />
      </Routes>
    </div>
  );
}

export default App;
