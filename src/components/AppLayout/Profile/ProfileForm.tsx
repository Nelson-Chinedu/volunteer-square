import React, { FunctionComponent, useState } from 'react';
import { Form } from 'antd';

import InputForm from 'src/components/SharedLayout/Shared/Input';
import Button from 'src/components/SharedLayout/Shared/Button';

const ProfileForm: FunctionComponent<{}> = () => {
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
    <div className="my-5 w-3/5 m-auto c-profileForm">
      <Form
        { ...formItemLayout }
        layout = "vertical"
        form = { form }
        initialValues = {{ layout: formLayout }}
        onValuesChange = { _onFormLayoutChange }
        className = " c-profileForm-container"
      >
        <div className="flex justify-between w-full c-profileForm-fullname">
          <InputForm
            label = "Firstname"
            placeholder = "Enter Firstname"
            type="text"
            size="large"
          />
          <InputForm
            label = "Lastname"
            placeholder = "Enter Lastname"
            type="text"
            size="large"
          />
        </div>
        <InputForm
          label = "Email Address"
          placeholder = "Enter Email Address"
          type="text"
          size="large"
        />
        <InputForm
          label = "Phone Number"
          placeholder = "Enter Phone Number"
          type = "tel"
          size = "large"
        />
        <InputForm
          label = "Password (Leave blank, if using current password)"
          placeholder = "Enter Password"
          type = "password"
          size = "large"
        />
        <Button
          item = {buttonItemLayout}
          type = "submit"
          className = "w-full bg-blue-700 rounded text-white p-3 mt-6 mb-2"
        >
          Save
        </Button>
      </Form>
    </div>
  )
};

export default ProfileForm;
