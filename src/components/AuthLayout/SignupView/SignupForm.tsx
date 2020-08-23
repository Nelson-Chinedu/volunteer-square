import React, { FunctionComponent, useState } from 'react';
import Link from 'next/link';
import { Divider, Spin, Alert } from 'antd';
import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { useFormik } from 'formik';
import * as yup from 'yup';

import InputForm from 'src/components/SharedLayout/Shared/Input';
import Button from 'src/components/SharedLayout/Shared/Button';
import SocialLogin from 'src/components/SharedLayout/Shared/SocialLogin';

const validationSchema = yup.object().shape({
  firstname: yup.string().required('Required'),
  lastname: yup.string().required('Required'),
  email: yup
    .string()
    .email('Enter a valid E-mail Address')
    .required('Required'),
  password: yup
    .string()
    .required('Required')
    .min(8, 'Password must be 8 characters long'),
});

const SignupForm: FunctionComponent<{}> = () => {
  const [responseMessage, setResponseMessage] = useState('');
  const [responseStatus, setResponseStatus] = useState(null);

  const apiUrl = 'http://localhost:8000/api/v1/signup';

  const _handleSignup = async () => {
    const data = await fetch(apiUrl, {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
      }),
    });
    const response = await data.json();

    if (response) {
      const { status, message } = response;

      if (status !== 201) {
        setResponseMessage(message);
        setResponseStatus(status);
      } else {
        setResponseMessage(message);
        setResponseStatus(status);
        resetForm();
      }
    }
  };

  const _handleClose = () => {
    setResponseMessage('');
    setResponseStatus(null);
  };

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    },
    onSubmit: _handleSignup,
    validationSchema,
  });

  const {
    values,
    errors,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
  } = formik;

  return (
    <div className="my-5 w-2/5 m-auto c-loginForm">
      <form onSubmit={handleSubmit} className="c-loginForm-container">
        {responseMessage ? (
          <Alert
            message={responseMessage}
            type={responseStatus !== 201 ? 'error' : 'success'}
            showIcon
            closable
            onClose={_handleClose}
            className="mb-4"
          />
        ) : (
          ''
        )}

        <div className="flex justify-between w-full c-signupform-fullname">
          <InputForm
            label="Firstname"
            placeholder="Enter Firstname"
            type="text"
            name="firstname"
            value={values.firstname}
            size="large"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.firstname}
            prefix={<UserOutlined />}
          />
          <InputForm
            label="Lastname"
            placeholder="Enter Lastname"
            type="text"
            name="lastname"
            value={values.lastname}
            size="large"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.lastname}
            prefix={<UserOutlined />}
          />
        </div>
        <InputForm
          label="Email"
          placeholder="Enter Email Address"
          type="email"
          name="email"
          value={values.email}
          size="large"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          prefix={<MailOutlined />}
          className="w-full"
        />
        <InputForm
          label="Password"
          placeholder="Enter Password"
          type="password"
          name="password"
          value={values.password}
          size="large"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          prefix={<LockOutlined />}
          className="w-full"
        />
        <Button
          type="submit"
          disabled={
            isSubmitting ||
            !values.firstname ||
            !values.lastname ||
            !values.email ||
            !values.password
          }
          className="text-white p-3 mt-6 mb-2"
          filled={true}
        >
          {isSubmitting ? (
            <Spin indicator={<LoadingOutlined />} className="text-white" />
          ) : (
            'Sign Up'
          )}
        </Button>
        <Divider>or</Divider>
        <SocialLogin />
        <Link href="/auth/login">
          <p className="pt-4">
            Already have an account?
            <a className="pl-1 text-blue-700 underline hover:no-underline">
              Sign In
            </a>
          </p>
        </Link>
      </form>
    </div>
  );
};

export default SignupForm;
