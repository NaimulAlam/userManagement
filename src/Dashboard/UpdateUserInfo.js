import React from 'react';
import Navbar from './Navbar';

const UpdateUserInfo = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="text-center">
        <h1 className="display-4">Update User Info</h1>
        <div className="mx-md-5 mx-2 p-md-5 p-2 g-3">
          <form className="mx-md-5 mx-1">
            <input className="form-control p-3 m-2" type="text" placeholder="alais" />
            <input className="form-control p-3 m-2" type="text" placeholder="first-name" />
            <input className="form-control p-3 m-2" type="text" placeholder="last-name" />
            <input className="form-control p-3 m-2" type="text" placeholder="email" />

            <div className="form-floating">
              <input className="form-control p-3 m-2" id="image-file" type="file" placeholder="update-image" />
              <label className="form-control my-5 text-start" htmlFor="image-file">
                Change Image? / Upload new image
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserInfo;
