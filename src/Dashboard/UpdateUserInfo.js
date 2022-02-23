import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const UpdateUserInfo = () => {
  const [userInfo, setUserInfo] = useState({});

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
    address: Yup.object().shape({
      country: Yup.string().required('Country name is required'),
      city: Yup.string().required('City name is required'),
      street: Yup.string().required('street name is required'),
      zipCode: Yup.string()
        .required('Zip Code is required')
        .min(5, 'Zip code must be 5 digits')
        .max(5, 'Zip code must be 5 digits'),
    }),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(formOptions);

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

  const updateUserInfo = async (submit) => {
    const url = 'http://localhost:5000/updateUserInfo';
    const req = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('umtoken'),
      },
      body: JSON.stringify(submit),
    });
    const data = await req.json();
    if (data.status === 'ok') {
      alert('User Info Updated');
      reset();
    } else {
      console.log(data.message);
      alert('ERROR!!! User Info Not Updated');
    }
    LoggedUser();
  };

  console.log(errors);

  return (
    <div className="container-fluid">
      <div>
        <div className="col my-5 py-0 py-md-5" id="profile">
          <div className="formDiv mt-4">
            <form onSubmit={handleSubmit(updateUserInfo)}>
              <fieldset>
                <legend>Update User Info</legend>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        id="alias"
                        className={`form-control ${errors.alias ? 'is-invalid' : ''}`}
                        type="text"
                        name="alias"
                        placeholder="alias"
                        {...register('alias')}
                      />
                      <label htmlFor="alias">Alias: {userInfo?.alias}</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        id="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        type="text"
                        name="email"
                        placeholder="Email"
                        {...register('email')}
                      />
                      <label htmlFor="email">Email: {userInfo?.email}</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        id="name"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        type="text"
                        name="name"
                        placeholder="Name"
                        {...register('name')}
                      />
                      <label htmlFor="name">Name: {userInfo?.name}</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        id="surname"
                        className={`form-control ${errors.surname ? 'is-invalid' : ''}`}
                        type="text"
                        name="surname"
                        placeholder="surname"
                        {...register('surname')}
                      />
                      <label htmlFor="surname">Surname: {userInfo?.surname}</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        id="phone"
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        type="text"
                        name="phone"
                        placeholder="Phone No"
                        {...register('phone')}
                      />
                      <label htmlFor="phone">Phone : {userInfo?.phone}</label>
                    </div>
                  </div>
                  <hr className="my-2" />
                  <legend>Address Details</legend>
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        id="country"
                        className="form-control"
                        type="text"
                        name="address.country"
                        placeholder="country"
                        {...register('address.country')}
                      />
                      <label htmlFor="country">Country : {userInfo?.address?.country}</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        id="city"
                        className="form-control"
                        type="text"
                        name="city"
                        placeholder="city"
                        {...register('address.city')}
                      />
                      <label htmlFor="city">City : {userInfo?.address?.city}</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        id="street"
                        className="form-control"
                        type="text"
                        name="address.street"
                        placeholder="street"
                        {...register('address.street')}
                      />
                      <label htmlFor="street">Street : {userInfo?.address?.street}</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        id="zipCode"
                        className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
                        type="number"
                        name="address.zipCode"
                        placeholder="Zip Code"
                        {...register('address.zipCode')}
                      />
                      <label htmlFor="zipCode">Zip Code : {userInfo?.address?.zipCode}</label>
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
