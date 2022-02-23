import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const SignIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
      .required('Email is required')
      .lowercase(),
    password: Yup.string().required('Password is required'),
  });

  const formOptions = { resolver: yupResolver(loginSchema) };

  // get functions to build form with useForm() hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  // login api call
  const onSubmit = async (submit) => {
    // console.log(submit);
    const url = 'http://localhost:5000/login';
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(submit),
    });
    const data = await response.json();
    if (data.userToken) {
      localStorage.setItem('umtoken', data.userToken);
      setIsLoggedIn(true);
      navigate('/dashboard');
      window.location.reload();
    } else {
      alert('Sign In Failed! Check your email and password');
    }
  };
  console.log(errors);

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoggedIn(true);
      navigate('/dashboard');
      window.location.reload();
    } else {
      setIsLoggedIn(false);
      navigate('/');
    }
  }, [isLoggedIn, setIsLoggedIn, navigate]);

  return (
    <div>
      <div id="SignIn" className="container-fluid text-center mt-5 pt-5">
        <h1 className="m-4 fw-bolder">User Management System</h1>
        <div className="formDiv">
          <form onSubmit={handleSubmit(onSubmit)} className="row my-5 px-md-5">
            <Link to="/" className="navbar-brand fs-2">
              <i className="bi bi-code-slash" />
            </Link>
            <legend className="text-center mt-2">Login</legend>
            <fieldset>
              <div className="col-12 position-relative">
                <input
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  type="text"
                  name="email"
                  placeholder="Email"
                  {...register('email')}
                />
                <div className="invalid-feedback">please type correct email address</div>
              </div>
              <div className="col-12 position-relative">
                <input
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  type="password"
                  name="password"
                  placeholder="Password"
                  {...register('password')}
                />
                <div className="invalid-feedback">please type correct password</div>
              </div>
              <div id="sign-in">
                <button type="submit" className="btn btn-info px-4 my-2">
                  Sign In
                </button>
              </div>
            </fieldset>
            <hr />
            <div className="container">
              <p className="my-4">
                Don't have an Account? <Link to="/registration">Create An Account</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
