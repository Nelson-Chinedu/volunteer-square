import React, { FunctionComponent } from 'react';
import { LoadingOutlined, LockOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {useRouter} from 'next/router';

import Button from 'src/components/SharedLayout/Shared/Button';
import InputForm from 'src/components/SharedLayout/Shared/Input';
import { Snackbar } from 'src/components/SharedLayout/Shared/Snackbar';

import callApi from 'src/utils/callApi';

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required('Required')
    .min(8, 'Password must be 8 characters long'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords don\'t match')
    .required('Required')
});

const ResetForm: FunctionComponent<{}> = () => {
  const router = useRouter();
  const {token} = router.query;

  const _handleResetPassword = async () => {
    if (token){
      if (values.password === values.confirmPassword){
        const data = {
          token,
          password: values.password
        };
        const response = await callApi({
          url: '/api/v1/reset-password',
          method: 'post',
          data
        });

        const {message, status} = response;

        if (status !== 201) {
          Snackbar('Message', message, '#000', '#fc8181');
        } else {
          Snackbar('Message', message, '#000', '#68d391');
          resetForm();
        }
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    onSubmit: _handleResetPassword,
    validationSchema
  });

  const {
    values,
    errors: { password, confirmPassword },
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm
  } = formik;
  return (
    <div className="my-5 md:w-4/12 w-11/12 m-auto c-loginForm">
      <form onSubmit={handleSubmit} className="c-loginForm-container">
        <InputForm
          label="Password"
          placeholder="•••••••••••"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={password}
          size="large"
          prefix={<LockOutlined />}
        />
        <InputForm
          label="Confirm Password"
          placeholder="•••••••••••"
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={confirmPassword}
          size="large"
          prefix={<LockOutlined />}
        />
        <Button
          type="submit"
          disabled={isSubmitting || !values.password || !values.confirmPassword}
          filled={true}
          className="w-full text-white p-3 mt-6 mb-2"
        >
          {isSubmitting ? (
            <Spin indicator={<LoadingOutlined className="text-white" />} />
          ) : (
            'Change Password'
          )}
        </Button>
      </form>
    </div>
  )
};

export default ResetForm;
