import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { Divider, Spin } from 'antd';
import { LockOutlined, MailOutlined, LoadingOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import * as yup from 'yup';

import InputForm from 'src/components/SharedLayout/Shared/Input';
import Button from 'src/components/SharedLayout/Shared/Button';
import SocialLogin from 'src/components/SharedLayout/Shared/SocialLogin';

const validationSchema = yup.object().shape({
  email: yup.string()
    .required('Required')
    .email('Enter a valid E-mail Address'),
  password: yup.string()
    .required('Required'),
});

const LoginForm: FunctionComponent<{}> = () => {

  const _handleLogin = () => {
    console.log('clicked');
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
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
  } = formik;

  return (
    <div className="my-5 w-2/5 m-auto c-loginForm">
      <form
        onSubmit={handleSubmit}
        className = " c-loginForm-container"
      >
        <InputForm
          label = "Email Address"
          placeholder = "Enter Email Address"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          size="large"
          prefix={<MailOutlined/>}
        />
        <InputForm
          label = "Password"
          placeholder = "Enter Password"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          size="large"
          prefix={<LockOutlined/>}
        />
        <Link href="#">
          <a className="underline hover:no-underline block text-right">Forgot Password?</a>
        </Link>
        <Button
          type = "submit"
          className = "w-full bg-blue-700 rounded text-white p-3 mt-6 mb-2"
        >
          {isSubmitting ? <Spin indicator={<LoadingOutlined className="text-white" />} /> : 'Sign In'}
        </Button>
         <Divider>or</Divider>
         <SocialLogin />
         <Link href="/auth/signup">
          <p className="pt-4">New user?
            <a className="pl-1 text-blue-700 underline hover:no-underline">
              Register for free
            </a>
          </p>
        </Link>
      </form>
    </div>
  )
};

export default LoginForm;
