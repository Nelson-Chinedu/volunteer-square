import React, { FunctionComponent, useState } from 'react';
import Link from 'next/link';
import { Form, Divider } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

import InputForm from 'src/components/SharedLayout/Shared/Input';
import Button from 'src/components/SharedLayout/Shared/Button';
import SocialLogin from 'src/components/SharedLayout/Shared/SocialLogin';


const LoginForm: FunctionComponent<{}> = () => {
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
        <InputForm
          label = "Email Address"
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
        <Link href="#">
          <a className="hover:underline">Forgot Password?</a>
        </Link>
        <Button
          item = {buttonItemLayout}
          type = "submit"
          className = "w-full bg-blue-700 rounded text-white p-3 mt-6 mb-2"
        >
          Sign In
        </Button>
         <Divider>or</Divider>
         <SocialLogin />
         <Link href="/auth/signup">
          <p className="pt-4">New user? <a className="hover:underline">Register for free</a></p>
        </Link>
      </Form>
    </div>
  )
};

export default LoginForm;
