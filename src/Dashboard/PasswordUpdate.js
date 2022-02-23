import React, { useEffect, useState } from 'react';

const PasswordUpdate = () => {
  const [userInfo, setUserInfo] = useState({});
  const [updatePassword, setUpdatePassword] = useState('');

  const handleChange = (e) => {
    setUpdatePassword(e.target.value);
  };

  async function LoggedUser() {
    const url = 'http://localhost:5000/userInfo';
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

  const updateUserInfo = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:5000/updatePassword';
    const req = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('umtoken'),
      },
      body: JSON.stringify({ password: updatePassword }),
    });
    const data = await req.json();
    if (data.status === 'ok') {
      setUpdatePassword('');
    } else {
      console.log(data.message);
    }
    LoggedUser();
  };

  return (
    <div className="container-fluid">
      <div>
        <div className="col my-5 py-0 py-md-5" id="profile">
          <div className="formDiv mt-4">
            <form onSubmit={updateUserInfo}>
              <fieldset>
                <legend>Update Password</legend>
                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input
                        id="password"
                        className="form-control "
                        type="password"
                        value={updatePassword}
                        placeholder="password"
                        onChange={handleChange}
                      />
                      <label htmlFor="password">
                        Password: {userInfo && updatePassword ? '***...***' : 'Write your new password'}
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

export default PasswordUpdate;
