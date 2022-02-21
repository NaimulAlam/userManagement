import React from 'react';

const Sidebar = () => {
  return (
    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100">
      <div className="text-center pb-3 mb-md-0 mx-auto fw-bolder fs-1 text-decoration-none">
        <span className="fs-2 d-none d-sm-inline">Dashboard</span>
      </div>
      <img className="rounded mx-auto d-block" src="{g4lLogo}" alt="" />

      <ul className="nav nav-tabs flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="sidebar">
        <li className="nav-item">
          <a href="/update-details" className="nav-link px-0 align-middle">
            <i className="fs-4 bi-pencil-square" />
            <span className="ms-1 d-none d-sm-inline">Update Details</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="/update-password" className="nav-link px-0 align-middle">
            <i className="fs-4 bi-safe2" />
            <span className="ms-1 d-none d-sm-inline">Update Password</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="/all-user" className="nav-link px-0 align-middle">
            <i className="fs-4 bi-card-list" />
            <span className="ms-1 d-none d-sm-inline">All User</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="/add-user" className="nav-link px-0 align-middle">
            <i className="fs-4 bi-file-plus" />
            <span className="ms-1 d-none d-sm-inline">Add User</span>
          </a>
        </li>
        <li className="nav-item py-3">
          <a href="/" className="btn btn-danger px-2">
            <i className="fs-5 bi-x-octagon-fill" />
            <span className="ms-1 d-none d-sm-inline">Signout</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
