import React, { FunctionComponent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Divider, Spin } from 'antd';
import {
  LockOutlined,
  MailOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { useFormik } from 'formik';
import * as yup from 'yup';
import store from 'store';

import ForgotPassword from 'src/components/AuthLayout/ForgotPassword';

import InputForm from 'src/components/SharedLayout/Shared/Input';
import Button from 'src/components/SharedLayout/Shared/Button';
import SocialLogin from 'src/components/SharedLayout/Shared/SocialLogin';
import { Snackbar } from 'src/components/SharedLayout/Shared/Snackbar';
import Icon from 'src/components/SharedLayout/Shared/SocialIcon';

import callApi from 'src/utils/callApi';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Required')
    .email('Enter a valid E-mail Address'),
  password: yup.string().required('Required'),
});

const LoginForm: FunctionComponent<{}> = () => {
  const [modalVisible, setModalVisible] = useState(false);
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

  const _handleGoogle = () => {
    window.location.href = `${process.env.API_URL}/google`;
  }

  const _handleFacebook = () => {
    window.location.href = `${process.env.API_URL}/auth/facebook`;
  }

  const _handleModal = () => {
    setModalVisible(true);
  }

  const _modalDisplay = () => {
    setModalVisible(false);
  }

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
      <ForgotPassword modalVisible={modalVisible} modalDisplay={_modalDisplay} />
      <form onSubmit={handleSubmit} className="c-loginForm-container">
        <div className="md:flex justify-between">
          <div className="w-full md:w-56">
            <SocialLogin handleSocialAuth={_handleGoogle}>
              <Icon path="/images/google.svg" classname="w-4 mr-2" /> Sign In with Google
            </SocialLogin>
          </div>
          <div className="w-full md:w-56">
            <SocialLogin handleSocialAuth={_handleFacebook}>
              <Icon path="/images/facebook.svg" classname="w-4 mr-2" /> Sign In with Facebook
            </SocialLogin>
          </div>
        </div>
        <Divider>OR</Divider>
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
          <a className="underline hover:no-underline block text-right" onClick={_handleModal}>
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
        <Link href="/auth/signup">
          <p className="pt-4 text-center">
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
