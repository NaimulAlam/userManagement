import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Navbar from './Navbar';

const Registration = () => {
  // const [isLoggedIn] = useContext(UserContext);

  const navigate = useNavigate();
  // form validation rules for yup
  const validationSchema = Yup.object().shape({
    alias: Yup.string()
      .required('Alias is required')
      .min(3, 'Alias must be at least 3 characters')
      .max(50, 'Alias must be less than 50 characters'),
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name must contain 3 charecter')
      .max(100, 'Max 100 charecter'),
    surname: Yup.string()
      .required('Surname is required')
      .min(3, 'Surame must contain 3 charecter')
      .max(100, 'Max 100 charecter'),
    email: Yup.string()
      .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
      .required('Email is required')
      .lowercase(),
    phone: Yup.string()
      .required('Phone No. is required')
      .min(9, 'Phone must be 9 charecter')
      .max(20, 'Phone must be 13 charecter'),
    password: Yup.string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/)
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(100, 'Password must be less than 100 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    country: Yup.string().required('Country name is required'),
    city: Yup.string().required('City name is required'),
    road: Yup.string().required('Road name is required'),
    zipCode: Yup.string()
      .required('Zip Code is required')
      .min(5, 'Zip code must be 5 digits')
      .max(5, 'Zip code must be 5 digits'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(formOptions);

  // registration api call
  const onSubmit = (submit) => {
    console.log(submit);
    reset();
    // api call
    // const url = 'https://goods4love.herokuapp.com/api/register';
    // fetch(url, {
    //   method: 'POST',
    //   headers: { 'content-type': 'application/json' },
    //   body: JSON.stringify(submit),
    // })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     if (data.status === 'ok') {
    //       reset();
    //       alert('Sign Up Successfull!');
    //       navigate('/login');
    //     } else {
    //       alert('Sign Up Failed!');
    //     }
    //     return data;
    //   })
    //   .catch((err) => {
    //     console.log('err', err);
    //   });
    // display form data on success
    // alert(`SUCCESS!! :-)\n\n${JSON.stringify(data, null, 4)}`);
  };
  console.log(errors);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate('/');
  //   } else {
  //     navigate('/registration');
  //   }
  // }, [isLoggedIn, navigate]);

  return (
    <div>
      <Navbar />
      <div datatype="form" id="SignUp" className="container my-5 pt-5">
        <form onSubmit={handleSubmit(onSubmit)} className="formDiv row g-3 px-md-5">
          <h3 className="text-center py-3"> Create An Acount </h3>
          <div className="col-12 position-relative">
            <input
              className={`form-control ${errors.alias ? 'is-invalid' : ''}`}
              type="text"
              name="alias"
              placeholder="alias"
              {...register('alias')}
            />
            <div className="invalid-feedback">{errors.alias?.message}</div>
          </div>
          <div className="col-12 position-relative">
            <input
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              type="text"
              name="name"
              placeholder="Name"
              {...register('name')}
            />
            <div className="invalid-feedback">{errors.name?.message}</div>
          </div>
          <div className="col-12 position-relative">
            <input
              className={`form-control ${errors.surname ? 'is-invalid' : ''}`}
              type="text"
              name="surname"
              placeholder="surname"
              {...register('surname')}
            />
            <div className="invalid-feedback">{errors.surname?.message}</div>
          </div>
          <div className="col-12 position-relative">
            <input
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              type="text"
              name="email"
              placeholder="Email"
              {...register('email')}
            />
            <div className="invalid-feedback">Please Use Valid Email Address</div>
          </div>
          <div className="col-12 position-relative">
            <input
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              type="text"
              name="phone"
              placeholder="Phone No"
              {...register('phone')}
            />
            <div className="invalid-feedback">{errors.phone?.message}</div>
          </div>
          <div className="col-12 position-relative">
            <input
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              type="password"
              name="password"
              placeholder="Password"
              {...register('password')}
            />
            <div className="invalid-feedback">
              Password Must Contain A Uppercase, A lowercase, A number, A special Charecter with min 6 Charecter
            </div>
          </div>
          <div className="col-12 position-relative">
            <input
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              {...register('confirmPassword')}
            />
            <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
          </div>
          <div className="col-12 position-relative">
            <input className="form-control" type="text" name="country" placeholder="country" {...register('country')} />
            <div className="invalid-feedback">{errors.country?.message}</div>
          </div>
          <div className="col-12 position-relative">
            <input className="form-control" type="text" name="city" placeholder="city" {...register('city')} />
            <div className="invalid-feedback">{errors.city?.message}</div>
          </div>
          <div className="col-12 position-relative">
            <input className="form-control" type="text" name="road" placeholder="road" {...register('road')} />
            <div className="invalid-feedback">{errors.road?.message}</div>
          </div>
          <div className="col-12 position-relative">
            <input
              className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
              type="number"
              name="zipCode"
              placeholder="Zip Code"
              {...register('zipCode')}
            />
            <div className="invalid-feedback">{errors.zipCode?.message}</div>
          </div>
          <div className="col-12 position-relative">
            <input
              className="form-check-input"
              type="checkbox"
              name="termsAndConditions"
              id="termsAndConditions"
              required
            />
            <label className="form-check-label mx-2" htmlFor="termsAndConditions">
              I agree to all terms and conditions may apply
            </label>
            <div className="invalid-tooltip"> Please check and proceed with the terms and conditions.</div>
          </div>
          <div className="col-12 text-center">
            <button className="btn btn-primary px-5" type="submit">
              Submit form
            </button>
            <button
              className="btn btn-danger my-2 my-md-0 mx-3 mx-md-0 float-end"
              type="button"
              onClick={() => {
                reset();
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
