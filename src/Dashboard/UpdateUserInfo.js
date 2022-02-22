import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const UpdateUserInfo = () => {
  const [userInfo, setUserInfo] = useState({});
  // usesate with odjaect fully working and tested
  const [updateInfo, setUpdateInfo] = useState({
    alias: userInfo?.alais,
    name: userInfo?.name,
    surname: userInfo?.surname,
    email: userInfo?.email,
    phone: userInfo?.phone,
    address: {
      country: userInfo?.address?.country,
      city: userInfo?.address?.city,
      street: userInfo?.address?.street,
      zipCode: userInfo?.address?.zipCode,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateInfo((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    console.log('up', updateInfo);
  };

  async function LoggedUser() {
    const url = 'https://goods4love.herokuapp.com/api/userInfo';
    const req = await fetch(url, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    });
    const data = await req.json();
    console.log('dt', data);
    if (data.status === 'ok') {
      setUserInfo(data?.userInfo);
      console.log(data);
    } else {
      console.log(data.message);
    }
  }

  useEffect(() => {
    LoggedUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateUserInfo = async (e) => {
    e.preventDefault();
    const url = 'https://goods4love.herokuapp.com/api/userInfoUpdate';
    const req = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        // most important line wasted 2 hr to figure out
        // to send the data in the right format to the server
        alais: updateInfo.alias,
        name: updateInfo.name,
        surname: updateInfo.surname,
        email: updateInfo.email,
        phone: updateInfo.phone,
        address: {
          country: updateInfo.address.country,
          city: updateInfo.address.city,
          street: updateInfo.address.street,
          zipCode: updateInfo.address.zipCode,
        },
      }),
    });
    const data = await req.json();
    if (data.status === 'ok') {
      updateInfo.surname = '';
      updateInfo.ocupation = '';
    } else {
      console.log(data.message);
    }
    LoggedUser();
  };

  return (
    <div className="container-fluid">
      <div>
        <div>
          <Navbar />
        </div>
        <div className="col my-5 py-0 py-md-5" id="profile">
          <div className="formDiv mt-4">
            <form onSubmit={updateUserInfo}>
              <fieldset>
                <legend>Update User Info</legend>
                <div className="row">
                  <div className="col-md-5">
                    <div className="form-floating mb-3">
                      <input
                        id="alias"
                        className="form-control "
                        type="alias"
                        value={updateInfo.alias}
                        placeholder="alias"
                        onChange={handleChange}
                      />
                      <label htmlFor="alias">Alias: {userInfo?.alias}</label>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="form-floating mb-3">
                      <input
                        id="email"
                        className="form-control "
                        type="email"
                        value={updateInfo.email}
                        placeholder="name@example.com"
                        onChange={handleChange}
                      />
                      <label htmlFor="email">Email: {userInfo?.email}</label>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="form-floating mb-3">
                      <input
                        id="name"
                        className="form-control "
                        type="name"
                        value={updateInfo.name}
                        placeholder="Name"
                        onChange={handleChange}
                      />
                      <label htmlFor="name">Name: {userInfo?.name}</label>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="form-floating mb-3">
                      <input
                        id="surname"
                        className="form-control "
                        type="surname"
                        value={updateInfo.surname}
                        placeholder="name@example.com"
                        onChange={handleChange}
                      />
                      <label htmlFor="surname">Surname: {userInfo?.surname}</label>
                    </div>
                  </div>

                  <div className="col-md-5">
                    <div className="form-floating mb-3">
                      <input
                        id="phone"
                        name="phone"
                        className="form-control"
                        type="text"
                        value={updateInfo.phone}
                        placeholder="Last Name"
                        onChange={handleChange}
                      />
                      <label htmlFor="phone">Phone : {userInfo?.phone}</label>
                    </div>
                  </div>
                  <hr className="my-2" />
                  <legend>Address Details</legend>
                  <div className="col-md-5">
                    <div className="form-floating mb-3">
                      <input
                        id="country"
                        name="country"
                        className="form-control"
                        type="text"
                        value={updateInfo.country}
                        placeholder="country"
                        onChange={handleChange}
                      />
                      <label htmlFor="country">Country : {userInfo?.country}</label>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="form-floating mb-3">
                      <input
                        id="city"
                        name="city"
                        className="form-control"
                        type="text"
                        value={updateInfo.city}
                        placeholder="city"
                        onChange={handleChange}
                      />
                      <label htmlFor="city">City : {userInfo?.city}</label>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="form-floating mb-3">
                      <input
                        id="street"
                        name="street"
                        className="form-control"
                        type="text"
                        value={updateInfo.street}
                        placeholder="street"
                        onChange={handleChange}
                      />
                      <label htmlFor="street">Street : {userInfo?.street}</label>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="form-floating mb-3">
                      <input
                        id="zipCode"
                        name="zipCode"
                        className="form-control"
                        type="text"
                        value={updateInfo.zipCode}
                        placeholder="zipCode"
                        onChange={handleChange}
                      />
                      <label htmlFor="zipCode">Zip Code : {userInfo?.zipCode}</label>
                    </div>
                  </div>
                </div>
                <div className="text-center my-2">
                  <input className="btn btn-danger my-2" type="submit" value="Update" />
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserInfo;
