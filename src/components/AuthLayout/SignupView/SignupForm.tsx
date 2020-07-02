import React, { FunctionComponent, useState } from 'react';
import Link from 'next/link';
import { Form, Divider } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

import InputForm from 'src/components/SharedLayout/Shared/Input';
import ButtonForm from 'src/components/SharedLayout/Shared/Button';
import SocialLogin from 'src/components/SharedLayout/Shared/SocialLogin';


const SignupForm: FunctionComponent<{}> = () => {
  const [ form ] = Form.useForm();
  const [ formLayout, setFormLayout ] = useState('vertical');

  const _onFormLayoutChange = ({ layout}: any) => {
    setFormLayout(layout);
  };

  const formItemLayout = formLayout === 'vertical'
    ?
      {
        labelCol: {
          span: 24
        },
        wrapperCol: {
          span: 48
        },
      } : null;

  const buttonItemLayout = formLayout === 'vertical' ?
    {
      wrapperCol: {
        span: 48,
      },
    } : null;

  return (
    <div className="my-5 w-2/5 m-auto c-loginForm">
      <Form
        { ...formItemLayout }
        layout = "vertical"
        form = { form }
        initialValues = {{ layout: formLayout }}
        onValuesChange = { _onFormLayoutChange }
        className = " c-loginForm-container"
      >
        <div className="flex justify-between w-full c-signupform-fullname">
          <InputForm
            label = "Firstname"
            placeholder = "Enter Firstname"
            type="text"
            size="large"
            prefix={<UserOutlined/>}
          />
          <InputForm
            label = "Lastname"
            placeholder = "Enter Lastname"
            type="text"
            size="large"
            prefix={<UserOutlined/>}
          />
        </div>
        <InputForm
          label = "Email"
          placeholder = "Enter Email Address"
          type="email"
          size="large"
          prefix={<MailOutlined/>}
        />
        <InputForm
          label = "Password"
          placeholder = "Enter Password"
          type="password"
          size="large"
          prefix={<LockOutlined/>}
        />
        <ButtonForm
          item = {buttonItemLayout}
          type = "submit"
          className = "w-full bg-blue-700 rounded text-white p-3 mt-6 mb-2"
        >
          Sign Up
        </ButtonForm>
         <Divider>or</Divider>
         <SocialLogin/>
         <Link href="/auth/login">
          <p className="pt-4">Already have an account? <a className="hover:underline">Sign In</a></p>
        </Link>
      </Form>
    </div>
  )
};

export default SignupForm;
