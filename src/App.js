/* eslint-disable import/no-cycle */
import { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddAdmin from './Dashboard/AddAdmin';
import Alluser from './Dashboard/Alluser';
import Dashboard from './Dashboard/Dashboard';
import OneUser from './Dashboard/OneUser';
import PasswordUpdate from './Dashboard/PasswordUpdate';
import PrivateRoute from './Dashboard/PrivateRoute';
import Registration from './Dashboard/Registration';
import SignIn from './Dashboard/SignIn';
import UpdateUserInfo from './Dashboard/UpdateUserInfo';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const umtoken = localStorage.getItem('umtoken');

  if (!loggedInUser?.email && umtoken) {
    const decoded = JSON.parse(atob(umtoken.split('.')[1]));
    const info = { ...loggedInUser };
    info.id = decoded.id;
    info.email = decoded.email;
    info.name = decoded.name;
    info.surname = decoded.surname;
    console.log('info', info);
    console.log('decoded', decoded);
  }

  return (
    <div>
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/*" element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="update-details" element={<UpdateUserInfo />} />
            <Route path="update-password" element={<PasswordUpdate />} />
            <Route path="add-user" element={<AddAdmin />} />
            <Route path="users" element={<Alluser />} />
            <Route path="user/:id" element={<OneUser />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
