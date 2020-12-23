import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { Divider, Spin } from 'antd';
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
import Icon from 'src/components/SharedLayout/Shared/SocialIcon';
import { Snackbar } from 'src/components/SharedLayout/Shared/Snackbar';

import callApi from 'src/utils/callApi';

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

  const _handleGoogle = () => {
    window.location.href = `${process.env.API_URL}/google`;
  }

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
        <div className="md:flex justify-between">
          <div className="w-full md:w-56">
            <SocialLogin handleGoogle={_handleGoogle}>
              <Icon path="/images/google.svg" classname="w-4 mr-2" /> Sign up with Google
            </SocialLogin>
          </div>
          <div className="w-full md:w-56">
            <SocialLogin>
              <Icon path="/images/facebook.svg" classname="w-4 mr-2" /> Sign up with Facebook
            </SocialLogin>
          </div>
        </div>
        <Divider>OR</Divider>
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
        <Link href="/auth/login">
          <p className="pt-4 text-center">
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
