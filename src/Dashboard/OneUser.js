import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const OneUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [deleteUser, setDeleteUser] = useState(false);

  useEffect(() => {
    const url = `https://user-management-naim.herokuapp.com/userInfo/${id}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'x-access-token': localStorage.getItem('umtoken'),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUser(data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleClick = (e) => {
    e.preventDefault();
    const url = `https://user-management-naim.herokuapp.com/delete/${id}`;
    fetch(url, {
      headers: {
        'x-access-token': localStorage.getItem('umtoken'),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 'ok') {
          setDeleteUser(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container-fluid m-5">
      {deleteUser === false ? (
        <div className="formDiv">
          <h2>Current user id: {user._id}</h2>
          <h2>Current user name: {user.name}</h2>
          <button type="button" className="btn btn-danger" onClick={handleClick}>
            delete
          </button>
        </div>
      ) : (
        <div className="formDiv">
          <h2>User Successfully Deleted</h2>
          <a href="/users" className="btn btn-outline-primary">
            Go Back
          </a>
        </div>
      )}
    </div>
  );
};

export default OneUser;
