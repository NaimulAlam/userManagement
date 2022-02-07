import React, { useEffect, useState } from 'react';
import naim from './../Assets/Naim.jpg';

const UserInfo = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const url = 'https://randomuser.me/api/';
    fetch(url, {
      method: 'GET',
    })
      .then((response) => {
      return response.json();
      })
      .then((data) => {
        console.log(data);
      setUser(data.results[0]);
      })
      .catch((error) => {
      console.log(error);
    });
  }, []);


  return (
    <div>
      <div className='m-5 py-3 px-5'>
        <img
          src={user?.picture?.large}
          className="bd-placeholder-img rounded-circle"
          width="140"
          height="140"
          alt="" />
        <h2>{user?.name?.title +'. '+ user?.name?.first+' '+ user?.name?.last}</h2>
        <p>
          Email: {user?.email}
        </p>
        <p><a className="btn btn-secondary" href="#a">View details »</a></p>
      </div>
    </div>
  );
};

export default UserInfo;