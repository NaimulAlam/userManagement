import React, { useEffect, useState } from 'react';

const AddAdmin = () => {
  const [userInfo, setUserInfo] = useState({});
  const [adminEmail, setAdminEmail] = useState('');

  const handleChange = (e) => {
    setAdminEmail(e.target.value);
  };

  async function LoggedUser() {
    const url = 'https://user-management-naim.herokuapp.com/userInfo';
    const req = await fetch(url, {
      headers: {
        'x-access-token': localStorage.getItem('umtoken'),
      },
    });
    const data = await req.json();
    if (data.status === 'ok') {
      setUserInfo(data?.userInfo);
    } else {
      console.log(data.message);
    }
  }

  useEffect(() => {
    LoggedUser();
  }, []);

  // Donations Details Submit api call

  const handleSubmit = (e) => {
    e.preventDefault();
    const AdminData = {
      adminEmail,
      user: userInfo.email,
    };
    const url = 'https://user-management-naim.herokuapp.com/addAdmin';
    fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-access-token': localStorage.getItem('umtoken') },
      body: JSON.stringify(AdminData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === 'ok') {
          // update the input to blank after submit
          setAdminEmail('');
          alert('Admin Added Successfully');
        } else {
          alert('Admin not added, Duplicate Admin Email.');
        }
        return data;
      })
      .catch((err) => {
        console.log('err', err);
      });
    LoggedUser();
  };

  return (
    <div className="container-fluid">
      <div>
        <div className="my-5 py-5" id="profile">
          <div className="formDiv my-5 py-5">
            <form onSubmit={handleSubmit}>
              <fieldset>
                <legend>Add An Admin</legend>
                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input
                        id="adminEmail"
                        className="form-control "
                        type="email"
                        value={adminEmail}
                        placeholder="adminEmail"
                        onChange={handleChange}
                      />
                      <label htmlFor="adminEmail">
                        Admin Email: {userInfo && adminEmail ? 'example@mail.com' : `Write new admin's email`}
                      </label>
                    </div>
                    <div className="my-2">
                      <input className="btn btn-danger my-2" type="submit" value="Update" />
                    </div>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;
