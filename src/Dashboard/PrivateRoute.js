import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const [auth, setAuth] = useState(true);

  useEffect(() => {
    async function LoggedUser() {
      const url = 'http://localhost:5000/userInfo';
      const req = await fetch(url, {
        headers: {
          'x-access-token': localStorage.getItem('umtoken'),
        },
      });
      const data = await req.json();
      if (data.status === 'ok') {
        setAuth(true);
      } else {
        setAuth(false);
      }
    }
    LoggedUser();
  }, [setAuth]);

  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
