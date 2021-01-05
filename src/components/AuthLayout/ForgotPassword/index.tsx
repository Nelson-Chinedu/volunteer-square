import React, { FunctionComponent } from 'react';
import {Modal, Spin} from 'antd';
import { LoadingOutlined, MailOutlined } from '@ant-design/icons';
import {useFormik} from 'formik';
import * as yup from 'yup';

import InputForm from 'src/components/SharedLayout/Shared/Input';
import Button from 'src/components/SharedLayout/Shared/Button';
import { Snackbar } from 'src/components/SharedLayout/Shared/Snackbar';

import callApi from 'src/utils/callApi';


type Props = {
  modalDisplay: () => void;
  modalVisible: boolean;
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Required')
    .email('Enter a valid E-mail Address')
});

const ForgotPassword: FunctionComponent<Props> = ({modalDisplay, modalVisible}) => {
  const _handleReset = async () => {
    const data = {
      email: values.email
    };

    const response = await callApi({
      url: '/api/v1/forgot-password',
      method: 'post',
      data
    });

    const {message} = response;

    if (message){
      Snackbar('Message', message, '#000', '#68d391');
    }
    resetForm();
  }

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: _handleReset,
    validationSchema
  });

  const {
    values,
    errors:{ email },
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  } = formik;

  return (
    <div>
       <Modal
          title="Reset Password"
          style={{ top: 20 }}
          visible={modalVisible}
          onCancel={modalDisplay}
          footer={[
            <Button
              key="back"
              className="border border-red-500 hover:bg-red-500 px-4 py-2"
              type="button"
              handleClick={modalDisplay}
            >
              Cancel
            </Button>,
          ]}
        >
          <form onSubmit={handleSubmit}>
          <InputForm
            label="Enter your Email Address"
            placeholder="Enter Email Address"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={email}
            size="large"
            prefix={<MailOutlined />}
          />
          <Button
            type="submit"
            disabled={isSubmitting || !values.email}
            filled={true}
            className="w-full text-white p-3 mt-1 mb-2"
          >
            {isSubmitting ? (
              <Spin indicator={<LoadingOutlined className="text-white" />} />
            ) : (
              'Password Reset'
            )}
          </Button>
          </form>
        </Modal>
    </div>
  )
};

export default ForgotPassword;
