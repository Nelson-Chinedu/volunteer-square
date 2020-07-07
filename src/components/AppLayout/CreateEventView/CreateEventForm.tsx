import React, { FunctionComponent } from 'react';
import { TimePicker, DatePicker, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Select from 'react-select';
import { useFormik } from 'formik';
import * as yup from 'yup';

import InputForm from 'src/components/SharedLayout/Shared/Input';
import Button from 'src/components/SharedLayout/Shared/Button';
import UploadFile from 'src/components/AppLayout/CreateEventView/UploadFile';

const validationSchema = yup.object().shape({
  eventName: yup.string()
    .required('Required'),
  eventCategory: yup.string()
    .required('Required'),
  eventLocation: yup.string()
    .required('Required'),
  eventDate: yup.string()
    .required('Required'),
  startTime: yup.string()
    .required('Required'),
  endTime: yup.string()
    .required('Required'),
  eventDescription: yup.string()
    .required('Required'),
});

const CreateEventForm: FunctionComponent<{}> = () => {

  const _handleEventForm = () => {
    console.log('clicked');
  };

  const formik = useFormik({
   initialValues: {
     eventName: '',
     eventCategory: '',
     eventLocation: '',
     eventDate: '',
     startTime: '',
     endTime: '',
     eventDescription: '',
   },
   onSubmit: _handleEventForm,
   validationSchema
  });

  const {
    values,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
  } = formik;

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
      <form
        onSubmit={handleSubmit}
        className = " c-createEventForm-container"
      >
        <InputForm
          label = "Event Name"
          placeholder = "Enter Event Name"
          name="eventName"
          value={values.eventName}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          size="large"
          error={errors.eventName}
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
          name="eventDescription"
          value={values.eventDescription}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.eventDescription}
          size = "large"
          className = "w-full h-32 resize-none c-eventDescription"
        />
        <div>
          <label htmlFor="">Upload Event Image</label>
          <UploadFile />
        </div>
        <Button
          type = "submit"
          className = "w-full bg-blue-700 rounded text-white p-3 mt-6 mb-2"
        >
          {isSubmitting ? <Spin indicator={<LoadingOutlined className="text-white" />} /> : 'Create Event'}
        </Button>
      </form>
    </div>
  )
};

export default CreateEventForm;