import React, { FunctionComponent } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {useFormik} from 'formik';
import * as yup from 'yup';

import InputForm from 'src/components/SharedLayout/Shared/Input';
import Button from 'src/components/SharedLayout/Shared/Button';

const validationSchema = yup.object().shape({
  firstname: yup.string()
    .required('Required'),
  lastname: yup.string()
    .required('Required'),
  email: yup.string()
    .required('Required')
    .email('Enter a valid E-mail Address'),
  phone: yup.string()
    .required('Required'),
  password: yup.string()
    .required('Required')
    .min(8, 'Password must be 8 characters long'),
});

const ProfileForm: FunctionComponent<{}> = () => {

  const _handleProfile = () => {
    console.log('clicked');
  };

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      password: '',
    },
    onSubmit: _handleProfile,
    validationSchema
  });

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    errors
  } = formik;

  return (
    <div className="my-5 w-3/5 m-auto c-profileForm">
      <form
        onSubmit={handleSubmit}
        className = " c-profileForm-container"
      >
        <div className="flex justify-between w-full c-profileForm-fullname">
          <InputForm
            label = "Firstname"
            placeholder = "Enter Firstname"
            name="firstname"
            value={values.firstname}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            size="large"
            error={errors.firstname}
          />
          <InputForm
            label = "Lastname"
            placeholder = "Enter Lastname"
            name="lastname"
            value={values.lastname}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            size="large"
            error={errors.lastname}
          />
        </div>
        <InputForm
          label = "Email Address"
          placeholder = "Enter Email Address"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          size="large"
          error={errors.email}
        />
        <InputForm
          label = "Phone Number"
          placeholder = "Enter Phone Number"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          type = "tel"
          size = "large"
          error={errors.phone}
        />
        <InputForm
          label = "Password (Leave blank, if using current password)"
          placeholder = "Enter Password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          type = "password"
          size = "large"
          error={errors.password}
        />
        <Button
          type = "submit"
          className = "w-full bg-blue-700 rounded text-white p-3 mt-6 mb-2"
        >
          {isSubmitting ? <Spin indicator={<LoadingOutlined className="text-white" />} /> : 'Save'}
        </Button>
      </form>
    </div>
  )
};

export default ProfileForm;
