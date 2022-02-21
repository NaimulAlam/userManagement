import React, { useEffect, useState } from 'react';

const UserDashboard = () => {
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
    <div className="container">
      <div className="m-md-5 m-1 py-3 px-md-5 px-1">
        <img src={user?.picture?.large} className="bd-placeholder-img rounded-circle" width="140" height="140" alt="" />
        <h2>{`${user?.name?.title}. ${user?.name?.first} ${user?.name?.last}`}</h2>
        <p>Email: {user?.email}</p>
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingOne">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
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
                      <p>Gender: {user?.gender}</p>
                      <p>Address :</p>
                      <ul className="list-group">
                        <li className="list-group-item">Country: {user?.location?.country}</li>
                        <li className="list-group-item">City: {user?.location?.city}</li>
                        <li className="list-group-item">State: {user?.location?.state}</li>
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
