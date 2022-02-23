import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const OneUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [deleteUser, setDeleteUser] = useState(false);

  useEffect(() => {
    const url = `http://localhost:5000/userInfo/${id}`;
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
        console.log('setuser', data);
        setUser(data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  // useEffect(() => {
  //   const url = `http://localhost:5000/delete/${id}`;
  //   fetch(url, {
  //     headers: {
  //       'x-access-token': localStorage.getItem('umtoken'),
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log('deleteData', data);
  //       setDeleteUser(data.user);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const url = `http://localhost:5000/delete/${id}`;
    fetch(url, {
      headers: {
        'x-access-token': localStorage.getItem('umtoken'),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('deleteData', data);
        setDeleteUser(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="m-5">
      <h2>Current user id: {user._id}</h2>
      <h2>Current user name: {user.name}</h2>
      <button type="button" className="btn btn-danger" onClick={handleClick}>
        delete
      </button>
      <br />
      <p>{deleteUser === true ? 'User Deleted' : 'user available'}</p>
    </div>
  );
};

export default OneUser;
