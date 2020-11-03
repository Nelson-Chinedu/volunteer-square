import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { Divider, Spin } from 'antd';
import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
  LoadingOutlined,
  GoogleOutlined,
  FacebookOutlined,
} from '@ant-design/icons';
import { useFormik } from 'formik';
import * as yup from 'yup';

import InputForm from 'src/components/SharedLayout/Shared/Input';
import Button from 'src/components/SharedLayout/Shared/Button';
import SocialLogin from 'src/components/SharedLayout/Shared/SocialLogin';

import callApi from 'src/utils/callApi';
import { Snackbar } from 'src/components/SharedLayout/Shared/Snackbar';

const validationSchema = yup.object().shape({
  firstname: yup
    .string()
    .min(2, 'Firstname Too Short')
    .max(50, 'Firstname Too Long')
    .required('Required'),
  lastname: yup
    .string()
    .min(2, 'Lastname Too Short')
    .max(50, 'Lastname Too Long')
    .required('Required'),
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

  const _handleSignup = async () => {
    const data = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
    };
    const response = await callApi({
      url: '/api/v1/signup',
      method: 'post',
      data,
    });

    if (response) {
      const { status, message } = response;

      if (status !== 201) {
        Snackbar('Message', message, '#000', '#fc8181');
      } else {
        Snackbar('Message', message, '#000', '#68d391');
        resetForm();
      }
    }
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
    <div className="my-5 md:w-5/12 w-11/12 m-auto c-loginForm">
      <form onSubmit={handleSubmit} className="c-loginForm-container">
        <div className="flex flex-col md:flex-row justify-between w-full c-signupform-fullname">
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
          className="w-full text-white p-3 mt-6 mb-2"
          filled={true}
        >
          {isSubmitting ? (
            <Spin indicator={<LoadingOutlined />} className="text-white" />
          ) : (
            'Sign Up'
          )}
        </Button>
        <Divider>or</Divider>
        <>
          <SocialLogin>
            <GoogleOutlined className="mr-2" /> Signup with Google
          </SocialLogin>
          <SocialLogin>
            <FacebookOutlined className="mr-2"/> Signup with Facebook
          </SocialLogin>
        </>
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
