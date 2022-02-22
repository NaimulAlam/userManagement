import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddAdmin from './Dashboard/AddAdmin';
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
        <Route path="/add-user" element={<AddAdmin />} />
      </Routes>
    </div>
  );
}

export default App;
