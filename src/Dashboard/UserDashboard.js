import React, { useEffect, useState } from 'react';
import img from '../Assets/Naim.png';

const UserDashboard = () => {
  const [user, setUser] = useState({});

  async function LoggedUser() {
    const url = 'https://user-management-naim.herokuapp.com/userInfo';
    const req = await fetch(url, {
      headers: {
        'x-access-token': localStorage.getItem('umtoken'),
      },
    });
    const data = await req.json();
    if (data.status === 'ok') {
      setUser(data.userInfo);
      console.log(data);
    } else {
      console.log(data.message);
    }
  }

  useEffect(() => {
    LoggedUser();
  }, []);

  return (
    <div className="container-fluid">
      <div className="m-md-5 m-1 py-3 px-md-5 px-1">
        <img
          src={user?.picture ? user?.picture : `${img}`}
          className="bd-placeholder-img rounded-circle"
          width="140"
          height="140"
          alt=""
        />
        <h2>{`${user?.name}. ${user?.surname}`}</h2>
        <p>Email: {user?.email}</p>
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingOne">
              <button
                className="btn btn-outline-info collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                <i className="fs-4 bi-person-rolodex mx-2" />
                View User Details
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="row">
                <div className="col">
                  <div className="card p-2">
                    <div className="accordion-body">
                      <p>Alias: {user?.alias}</p>
                      <p>Phone: {user?.phone}</p>
                      <p>Address :</p>
                      <ul className="list-group">
                        <li className="list-group-item">Country: {user?.address?.country}</li>
                        <li className="list-group-item">City: {user?.address?.city}</li>
                        <li className="list-group-item">State: {user?.address?.street}</li>
                        <li className="list-group-item">Zip Code: {user?.address?.zipCode}</li>
                      </ul>
                      <a className="btn btn-info my-3" href="/update-details">
                        edit details
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
