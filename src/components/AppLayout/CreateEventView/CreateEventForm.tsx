import React, { FunctionComponent, useState  } from 'react';
import { Spin, Select, DatePicker, TimePicker } from 'antd';
import { useRouter } from 'next/router';
import { LoadingOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/react-hooks';
import SunEditor from 'suneditor-react';

import Input from 'src/components/SharedLayout/Shared/Input';
import Button from 'src/components/SharedLayout/Shared/Button';
import { Snackbar } from 'src/components/SharedLayout/Shared/Snackbar';

import { CREATE_EVENT } from 'src/queries';

const CreateEventForm: FunctionComponent<{}> = () => {
  const router = useRouter();
  const [eventName, setEventName] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventRequirement, setEventRequirement] = useState(null);
  const [eventNameError, setEventNameError] = useState('');
  const [eventCategoryError, setEventCategoryError] = useState('');
  const [eventLocationError, setEventLocationError] = useState('');
  const [eventDateError, setEventDateError] = useState('');
  const [eventTimeError, setEventTimeError] = useState('');

  const [submitting, setSubmitting] = useState(false);

  const [createEvent, { loading }] = useMutation(CREATE_EVENT);

  const _handleEventName = (e: any) => {
    setEventName(e.target.value);
  }

  const _handleEventCategory = (value: any) => {
    setEventCategory(value);
  };

  const _handleEventLocation = (value: any) => {
    setEventLocation(value);
  };

  const _handleTimeSelection = (value: any) => {
    setEventTime(value);
  };

  const _handleDateSelection = (value: any) => {
    setEventDate(value);
  };

  const _handleRequirement = (content: any) => {
    setEventRequirement(content);
  }


  const _handleEventNameBlur = (e: any) => {
    if(!e.target.value){
      setEventNameError('Required');
    }else {
      setEventNameError('');
    }
  }

  const _handleLocationBlur = () => {
    if(!eventLocation){
      setEventLocationError('Required');
    }else {
      setEventLocationError('');
    }
  }

  const _handleCategoryBlur = () => {
    if(!eventCategory){
      setEventCategoryError('Required');
    }else {
      setEventCategoryError('');
    }
  }

  const _handleDateBlur = () => {
    if(!eventDate){
      setEventDateError('Required');
    }else {
      setEventDateError('');
    }
  }

  const _handleTimeBlur = () => {
    if(!eventTime){
      setEventTimeError('Required');
    }else {
      setEventTimeError('');
    }
  }

  const _handleCreateEvent = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const userData = await createEvent({
        variables: {
          name: eventName,
          description: eventRequirement,
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
        setSubmitting(false);
        Snackbar('Message', `${message}`, '#000', '#68d391');
        router.reload();
      }
    } catch (err) {
      Snackbar('Message', 'An error occured', '#000', '#fc8181');
    }
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
    <div className="my-5 w-2/5 m-auto c-createEventForm">
      <form
        onSubmit={_handleCreateEvent}
        method="POST"
        className="c-createEventForm-container"
      >
        <Input
          label="Event Name"
          placeholder="Enter Event Name"
          type="text"
          name="name"
          value={eventName}
          onChange={_handleEventName}
          onBlur={_handleEventNameBlur}
          error={eventNameError}
          size="large"
        />
        <div
          className="flex flex-col md:flex-row justify-between w-full md:mb-6 c-createEvent-category"
        >
          <div>
            <label>Category</label>
            <Select
              className="w-full"
              defaultValue={defaultValue[0].label}
              onChange={_handleEventCategory}
              onBlur={_handleCategoryBlur}
            >
              {categoryOptions.map((category) => {
                return (
                  <Select.Option key={category.value} value={category.value}>
                    {category.label}
                  </Select.Option>
                );
              })}
            </Select>
            <p className="text-red-400 mb-4 md:mb-0">{eventCategoryError}</p>
          </div>
          <div>
            <label>Location</label>
            <Select
              className="w-full"
              defaultValue={defaultValue[1].label}
              onChange={_handleEventLocation}
              onBlur={_handleLocationBlur}
            >
              {locationOptions.map((location) => {
                return (
                  <Select.Option key={location.value} value={location.value}>
                    {location.label}
                  </Select.Option>
                );
              })}
            </Select>
            <p className="text-red-400 mb-4 md:mb-0">{eventLocationError}</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between w-full mb-6 c-createEvent-category">
          <div>
            <label htmlFor="eventDate">Event Date</label>
            <DatePicker
              className="w-full mt-2"
              id="eventDate"
              size="large"
              onChange={_handleDateSelection}
              onBlur={_handleDateBlur}
            />
            <p className="text-red-400 mb-4 md:mb-0">{eventDateError}</p>
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
              onBlur={_handleTimeBlur}
            />
            <p className="text-red-400">{eventTimeError}</p>
          </div>
        </div>
        <p>Event Requirement</p>
        <SunEditor setOptions={
          {
            height: 300,
            buttonList: [[
              'bold', 'italic', 'underline', 'subscript', 'superscript', 'list', 'formatBlock'
            ]],
            resizingBar: false,
            customPlugins:[]
          }}
            setContents={eventRequirement}
            onChange={_handleRequirement}
            placeholder="Enter Event Requirement Here..."
          />
        <Button
          type="submit"
          disabled={
            submitting ||
            !eventName ||
            !eventCategory ||
            !eventLocation ||
            !eventDate ||
            !eventTime ||
            !eventRequirement
          }
          filled={true}
          className="w-full text-white p-3 mt-6 mb-2"
        >
          {submitting && loading ? (
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
