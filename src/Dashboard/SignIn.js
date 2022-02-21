import React from 'react';
import './All.css';

const SignIn = () => {
  return (
    <div className="text-center">
      <main className="form-signin">
        <form>
          <h2>
            <i className="bi bi-code-slash" />
          </h2>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="checkbox mb-3">
            <input id="rememberme" type="checkbox" value="remember-me" />
            <label htmlFor="rememberme" className="mx-2">
              Remember me
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
        </form>
        <hr />
        or
        <hr />
        <p>
          <a href="/registration">Create An Account</a>
        </p>
      </main>
      <footer>
        <p className="mt-5 mb-3 text-muted">© NAIM {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default SignIn;
