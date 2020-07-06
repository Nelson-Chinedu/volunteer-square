import React, { FunctionComponent, useState } from 'react';
import { Form, TimePicker, DatePicker } from 'antd';
import Select from 'react-select';

import InputForm from 'src/components/SharedLayout/Shared/Input';
import Button from 'src/components/SharedLayout/Shared/Button';
import UploadFile from 'src/components/AppLayout/CreateEventView/UploadFile';

const CreateEventForm: FunctionComponent<{}> = () => {
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

    const Defaultvalue = [
      {value: 'default', label: 'Select category'},
      {value: 'default', label: 'Select Location'},
    ];

    const categoryOptions = [
      {value: 'Tech', label: 'Tech'},
      {value: 'Theatre', label: 'Theatre Art'}
    ];

    const locationOptions = [
      {value: 'Lagos', label: 'Lagos'},
      {value: 'Abuja', label: 'Abuja'},
      {value: 'Ibadan', label: 'Ibadan'},
      {value: 'Ogun', label: 'Ogun'},
      {value: 'Abia', label: 'Abia'},
      {value: 'Imo', label: 'Imo'},
      {value: 'Anambra', label: 'Anambra'},
      {value: 'Ebonyi', label: 'Ebonyi'},
    ];

  return (
    <div className="my-5 w-3/5 m-auto c-createEventForm">
      <Form
        { ...formItemLayout }
        layout = "vertical"
        form = { form }
        initialValues = {{ layout: formLayout }}
        onValuesChange = { _onFormLayoutChange }
        className = " c-createEventForm-container"
      >
        <InputForm
          label = "Event Name"
          placeholder = "Enter Event Name"
          type="text"
          size="large"
        />
        <div className="flex justify-between w-full mb-6 c-createEvent-category">
          <div>
            <label htmlFor="eventCategory">Event Category</label>
            <Select
              defaultValue={Defaultvalue[0]}
              options={categoryOptions}
              id="eventCategory"
              className="w-full mt-2"
            />
          </div>
          <div>
            <label htmlFor="eventLocation">Event Location</label>
            <Select
              defaultValue={Defaultvalue[1]}
              options={locationOptions}
              id="eventLocation"
              className="w-full mt-2"
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="eventDate">Event Date</label>
          <DatePicker className="w-full mt-2" id="eventDate" size="large" />
        </div>
        <div className="flex justify-between w-full mb-6 c-createEvent-time">
          <div>
            <label htmlFor="startTime">Start Time</label>
            <TimePicker use12Hours format="h:mm a" id="startTime" className="w-full mt-2" size="large" />
          </div>
          <div>
            <label htmlFor="endTime">End Time</label>
            <TimePicker use12Hours format="h:mm a" id="endTime" className="w-full mt-2" size="large" />
          </div>
        </div>
        <InputForm
          label = "Event Description"
          placeholder = "Enter Event Description"
          type = "textarea"
          size = "large"
          className = "w-full h-32 resize-none c-eventDescription"
        />
        <div>
          <label htmlFor="">Upload Event Image</label>
          <UploadFile />
        </div>
        <Button
          item = {buttonItemLayout}
          type = "submit"
          className = "w-full bg-blue-700 rounded text-white p-3 mt-6 mb-2"
        >
          Create Event
        </Button>
      </Form>
    </div>
  )
};

export default CreateEventForm;