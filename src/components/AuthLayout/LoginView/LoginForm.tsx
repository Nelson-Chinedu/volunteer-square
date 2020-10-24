import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Divider, Spin } from 'antd';
import {
  LockOutlined,
  MailOutlined,
  LoadingOutlined,
  GoogleOutlined,
  FacebookOutlined
} from '@ant-design/icons';
import { useFormik } from 'formik';
import * as yup from 'yup';
import store from 'store';

import InputForm from 'src/components/SharedLayout/Shared/Input';
import Button from 'src/components/SharedLayout/Shared/Button';
import SocialLogin from 'src/components/SharedLayout/Shared/SocialLogin';
import { Snackbar } from 'src/components/SharedLayout/Shared/Snackbar';

import callApi from 'src/utils/callApi';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Required')
    .email('Enter a valid E-mail Address'),
  password: yup.string().required('Required'),
});

const LoginForm: FunctionComponent<{}> = () => {
  const router = useRouter();

  const _handleLogin = async () => {
    const data = {
      email: values.email,
      password: values.password,
    };
    const response = await callApi({
      url: '/api/v1/signin',
      method: 'post',
      data,
    });
    if (response) {
      const { status, message, payload } = response;
      if (status !== 200) {
        Snackbar('Message', message, '#000', '#fc8181');
      } else {
        store.set('__cnt', payload.token);
        Snackbar('Message', 'Login Successfully', '#000', '#68d391');
        resetForm();
        router.push('/app/dashboard');
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: _handleLogin,
    validationSchema,
  });

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = formik;

  return (
    <div className="my-5 md:w-5/12 w-11/12 m-auto c-loginForm">
      <form onSubmit={handleSubmit} className="c-loginForm-container">
        <InputForm
          label="Email Address"
          placeholder="Enter Email Address"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          size="large"
          prefix={<MailOutlined />}
        />
        <InputForm
          label="Password"
          placeholder="Enter Password"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          size="large"
          prefix={<LockOutlined />}
        />
        <Link href="#">
          <a className="underline hover:no-underline block text-right">
            Forgot Password?
          </a>
        </Link>
        <Button
          type="submit"
          disabled={isSubmitting || !values.email || !values.password}
          filled={true}
          className="w-full text-white p-3 mt-6 mb-2"
        >
          {isSubmitting ? (
            <Spin indicator={<LoadingOutlined className="text-white" />} />
          ) : (
            'Sign In'
          )}
        </Button>
        <Divider>or</Divider>
        <>
          <SocialLogin>
            <GoogleOutlined className="mr-2" /> Signin with Google
          </SocialLogin>
          <SocialLogin>
            <FacebookOutlined className="mr-2"/> Signin with Facebook
          </SocialLogin>
        </>
        <Link href="/auth/signup">
          <p className="pt-4">
            New user?
            <a className="pl-1 text-blue-700 underline hover:no-underline">
              Register for free
            </a>
          </p>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
