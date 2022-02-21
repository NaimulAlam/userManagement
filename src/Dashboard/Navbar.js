import React from 'react';

const Navbar = () => {
  return (
    <div>
      <header className="p-3 mb-3 border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" className="navbar-brand d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
              User Management
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <a href="/" className="nav-link px-2 link-secondary">
                  Home
                </a>
              </li>
              <li>
                <a href="/dashboard" className="nav-link px-2 link-dark">
                  Dashboard
                </a>
              </li>
            </ul>

            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
              <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
            </form>

            <div className="dropdown text-end">
              <a
                href="#a"
                className="d-block link-dark text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
              </a>
              <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                <li>
                  <a className="dropdown-item" href="/update-details">
                    Update Details
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/update-password">
                    Update Password
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
