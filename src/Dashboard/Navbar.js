import React from 'react';

const Navbar = ({ theme, setTheme }) => {
  console.log('Navbar props', { theme, setTheme });

  const umtoken = localStorage.getItem('umtoken');
  const handleLogout = () => {
    localStorage.removeItem('umtoken');
  };
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
                <a href="/dashboard" className="nav-link px-2 link-danger">
                  Dashboard
                </a>
              </li>
            </ul>

            {theme === '' ? (
              <button
                type="button"
                value="darkTheme"
                className="btn btn-dark mx-3"
                onClick={() => {
                  setTheme('darkTheme');
                }}
              >
                D <i className="bi-moon-fill pe-2" />
              </button>
            ) : (
              <button
                type="button"
                value=""
                className="btn btn-light mx-3"
                onClick={() => {
                  setTheme('');
                }}
              >
                L <i className="bi-sun" />
              </button>
            )}

            <div className="dropdown text-end">
              <a
                href="#a"
                className="d-block link-dark text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi-person-badge pe-2" />
              </a>
              {!umtoken ? (
                <ul className="dropdown-menu text-small text-center" aria-labelledby="dropdownUser1">
                  <li>
                    <a href="#sign-in" className="btn btn-info">
                      <i className="bi-x-octagon-fill pe-2" />
                      <span>Sign-in</span>
                    </a>
                  </li>
                </ul>
              ) : (
                <ul className="dropdown-menu text-small text-center" aria-labelledby="dropdownUser1">
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
                    <a href="/" className="btn btn-danger" onClick={handleLogout}>
                      <i className="bi-x-octagon-fill pe-2" />
                      <span>Signout</span>
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
