import React, { FunctionComponent, useState } from 'react';
import { Spin, Select, DatePicker, TimePicker, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/react-hooks';

import Input from 'src/components/SharedLayout/Shared/Input';
import Button from 'src/components/SharedLayout/Shared/Button';

import { CREATE_EVENT } from 'src/queries';

const { Option } = Select;

const validationSchema = yup.object().shape({
  name: yup.string().required('Required'),
  description: yup.string().required('Required'),
});

const CreateEventForm: FunctionComponent<{}> = () => {
  const [eventCategory, setEventCategory] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');

  const [createEvent, { loading }] = useMutation(CREATE_EVENT);

  const _handleEvent = async () => {
    try {
      const userData = await createEvent({
        variables: {
          name,
          description,
          category: eventCategory,
          location: eventLocation,
          time: eventTime,
          date: eventDate,
        },
      });
      if (userData) {
        const {
          data: {
            client: {
              createEvent: { message },
            },
          },
        } = userData;
        notification.success({
          message: 'Message',
          description: `${message}`
        })
        resetForm();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    onSubmit: _handleEvent,
    validationSchema,
  });

  const {
    values: { name, description },
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    errors,
  } = formik;

  const _handleCategorySelection = (value: any) => {
    setEventCategory(value);
  };

  const _handleLocationSelection = (value: any) => {
    setEventLocation(value);
  };

  const _handleTimeSelection = (value: any) => {
    setEventTime(value);
  };

  const _handleDateSelection = (value: any) => {
    setEventDate(value);
  };

  const defaultValue = [
    { label: 'Select category' },
    { label: 'Select Location' },
  ];

  const categoryOptions = [
    { value: 'Tech', label: 'Tech' },
    { value: 'Theatre', label: 'Theatre Art' },
  ];

  const locationOptions = [
    { value: 'Lagos', label: 'Lagos' },
    { value: 'Abuja', label: 'Abuja' },
    { value: 'Ibadan', label: 'Ibadan' },
    { value: 'Ogun', label: 'Ogun' },
    { value: 'Abia', label: 'Abia' },
    { value: 'Imo', label: 'Imo' },
    { value: 'Anambra', label: 'Anambra' },
    { value: 'Ebonyi', label: 'Ebonyi' },
  ];

  return (
    <div className="my-5 w-3/5 m-auto c-createEventForm">
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="c-createEventForm-container"
      >
        <Input
          label="Event Name"
          placeholder="Enter Event Name"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          size="large"
        />
        <div className="flex justify-between w-full mb-6 c-createEvent-category">
          <div>
            <label>Category</label>
            <Select
              className="w-full"
              defaultValue={defaultValue[0].label}
              onChange={_handleCategorySelection}
            >
              {categoryOptions.map((category) => {
                return (
                  <Option key={category.value} value={category.value}>
                    {category.label}
                  </Option>
                );
              })}
            </Select>
            <p className="text-red-400">{!eventCategory ? 'Required' : ''}</p>
          </div>
          <div>
            <label>Location</label>
            <Select
              className="w-full"
              defaultValue={defaultValue[1].label}
              onChange={_handleLocationSelection}
            >
              {locationOptions.map((location) => {
                return (
                  <Option key={location.value} value={location.value}>
                    {location.label}
                  </Option>
                );
              })}
            </Select>
            <p className="text-red-400">{!eventLocation ? 'Required' : ''}</p>
          </div>
        </div>
        <div className="flex justify-between w-full mb-6 c-createEvent-category">
          <div>
            <label htmlFor="eventDate">Event Date</label>
            <DatePicker
              className="w-full mt-2"
              id="eventDate"
              size="large"
              onChange={_handleDateSelection}
            />
            <p className="text-red-400">{!eventDate ? 'Required' : ''}</p>
          </div>
          <div>
            <label htmlFor="startTime">Start Time</label>
            <TimePicker
              use12Hours
              format="h:mm a"
              id="startTime"
              className="w-full mt-2"
              size="large"
              onChange={_handleTimeSelection}
            />
            <p className="text-red-400">{!eventTime ? 'Required' : ''}</p>
          </div>
        </div>
        <Input
          label="Event Description"
          placeholder="Enter Event Description"
          type="textarea"
          name="description"
          value={description}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.description}
          size="large"
          className="w-full h-32 resize-none c-eventDescription"
        />
        <Button
          type="submit"
          disabled={
            isSubmitting ||
            !name ||
            !description ||
            !eventDate ||
            !eventTime ||
            !eventCategory ||
            !eventLocation
          }
          filled={true}
          className="w-full text-white p-3 mt-6 mb-2"
        >
          {isSubmitting && loading ? (
            <Spin indicator={<LoadingOutlined className="text-white" />} />
          ) : (
            'Create Event'
          )}
        </Button>
      </form>
    </div>
  );
};

export default CreateEventForm;
