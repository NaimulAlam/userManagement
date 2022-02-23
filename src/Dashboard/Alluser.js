import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../Assets/Naim.png';

const Alluser = () => {
  const [alluser, setAllUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const url = 'http://localhost:5000/users';
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
        setAllUser(data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="container-fluid text-center">
      <div>
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
                        src={user?.picture ? user?.picture : `${img}`}
                        alt="user"
                      />

                      <h3>
                        {user?.name} {user?.surname}
                      </h3>
                      <p>{user?.email}</p>
                      <p>
                        Some representative placeholder content for the three columns of text below the carousel. This
                        is the first column.
                      </p>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          navigate(`/user/${user?._id}`);
                        }}
                      >
                        View details »
                      </button>
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
