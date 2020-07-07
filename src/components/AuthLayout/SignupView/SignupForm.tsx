import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { Divider, Spin } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import * as yup from 'yup';

import InputForm from 'src/components/SharedLayout/Shared/Input';
import Button from 'src/components/SharedLayout/Shared/Button';
import SocialLogin from 'src/components/SharedLayout/Shared/SocialLogin';

const validationSchema = yup.object().shape({
  firstname: yup.string()
    .required('Required'),
  lastname: yup.string()
    .required('Required'),
  email: yup.string()
    .email('Enter a valid E-mail Address')
    .required('Required'),
  password: yup.string()
    .required('Required')
    .min(8, 'Password must be 8 characters long'),
});

const SignupForm: FunctionComponent<{}> = () => {

  const _handleSignup = () => {
    console.log('clicked');
  }

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    },
    onSubmit: _handleSignup,
    validationSchema
  });

  const {
    values,
    errors,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleBlur,
  } = formik;

  return (
    <div className="my-5 w-2/5 m-auto c-loginForm">
      <form
        onSubmit={handleSubmit}
        className = " c-loginForm-container"
      >
        <div className="flex justify-between w-full c-signupform-fullname">
          <InputForm
            label = "Firstname"
            placeholder = "Enter Firstname"
            type="text"
            name="firstname"
            value={values.firstname}
            size="large"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.firstname}
            prefix={<UserOutlined/>}
          />
          <InputForm
            label = "Lastname"
            placeholder = "Enter Lastname"
            type="text"
            name="lastname"
            value={values.lastname}
            size="large"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.lastname}
            prefix={<UserOutlined/>}
          />
        </div>
        <InputForm
          label = "Email"
          placeholder = "Enter Email Address"
          type="email"
          name="email"
          value={values.email}
          size="large"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          prefix={<MailOutlined/>}
          className="w-full"
        />
        <InputForm
          label = "Password"
          placeholder = "Enter Password"
          type="password"
          name="password"
          value={values.password}
          size="large"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          prefix={<LockOutlined/>}
          className="w-full"
        />
        <Button
          type = "submit"
          className = "w-full bg-blue-700 rounded text-white p-3 mt-6 mb-2"
        >
          { isSubmitting? <Spin indicator={<LoadingOutlined/>} className="text-white" /> : 'Sign Up' }
        </Button>
         <Divider>or</Divider>
         <SocialLogin/>
         <Link href="/auth/login">
          <p className="pt-4">Already have an account?
            <a className="pl-1 text-blue-700 underline hover:no-underline">
              Sign In
            </a>
          </p>
        </Link>
      </form>
    </div>
  )
};

export default SignupForm;
