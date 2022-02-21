import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const Alluser = () => {
  const [alluser, setAllUser] = useState([]);

  useEffect(() => {
    const url = 'https://randomuser.me/api/?results=10';
    fetch(url, {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setAllUser(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="container-fluid text-center">
      <div>
        <Navbar />
        <h1 className="display-4">All User</h1>
      </div>
      <div>
        {alluser ? (
          <div>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {alluser.map((user) => {
                return (
                  <div key={user?.cell} className="col">
                    <div className="card p-2">
                      <img
                        className="img-thumbnail mx-auto d-block rounded-circle"
                        src={user?.picture.large}
                        alt="user"
                      />

                      <h3>
                        {user?.name.first} {user?.name.last}
                      </h3>
                      <p>{user?.email}</p>
                      <p>
                        Some representative placeholder content for the three columns of text below the carousel. This
                        is the first column.
                      </p>
                      <p>
                        <a className="btn btn-secondary" href="#aaa">
                          View details »
                        </a>
                      </p>
                      <span className="btn position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2">
                        <span className="visually-hidden">remove user</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Alluser;
