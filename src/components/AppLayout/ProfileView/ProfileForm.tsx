import React, { FunctionComponent, useState, useEffect } from 'react';
import { notification, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation, useQuery } from '@apollo/react-hooks';

import InputForm from 'src/components/SharedLayout/Shared/Input';
import Button from 'src/components/SharedLayout/Shared/Button';

import { GET_PROFILE, UPDATE_PROFILE } from 'src/queries';

const validationSchema = yup.object().shape({
  firstname: yup.string().required('Required'),
  lastname: yup.string().required('Required'),
  phoneNumber: yup.string().required('Required'),
  city: yup.string().required('Required'),
  country: yup.string().required('Required'),
});

const ProfileForm: FunctionComponent<{}> = () => {
  const [userFirstname, setUserFirstname] = useState('');
  const [userLastname, setUserLastname] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [userCity, setUserCity] = useState('');
  const [userCountry, setUserCountry] = useState('');

  const [updateProfile, { loading }] = useMutation(UPDATE_PROFILE);
  const { data: userFeed } = useQuery(GET_PROFILE);

  useEffect(() => {
    if (userFeed) {
      const { getUserProfile } = userFeed.client;
      setUserFirstname(getUserProfile.firstname);
      setUserLastname(getUserProfile.lastname);
      setUserPhoneNumber(getUserProfile.phoneNumber);
      setUserCity(getUserProfile.city);
      setUserCountry(getUserProfile.country);
    }
  }, [userFeed]);

  const _handleProfile = async () => {
    try {
      const userData = await updateProfile({
        variables: {
          firstname,
          lastname,
          phoneNumber,
          city,
          country,
        },
      });

      if (userData) {
        const {
          data: {
            client: {
              updateProfile: { message },
            },
          },
        } = userData;
        notification.success({
          message: 'Message',
          description: `${message}`,
        });
      } else {
        notification.error({
          message: 'Message',
          description: 'An error occured',
        });
      }
    } catch (err) {
      notification.error({
        message: 'Message',
        description: 'An error occured',
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      phoneNumber: '',
      city: '',
      country: '',
    },
    onSubmit: _handleProfile,
    validationSchema,
  });

  const {
    values: { firstname, lastname, city, country, phoneNumber },
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    errors,
  } = formik;

  return (
    <div className="my-5 w-3/5 m-auto c-profileForm">
      <form
        onSubmit={handleSubmit}
        className=" c-profileForm-container"
        method="POST"
      >
        <div className="flex justify-between w-full c-profileForm-fullname">
          <InputForm
            label="Firstname"
            placeholder="Enter Firstname"
            name="firstname"
            value={userFirstname || firstname}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            size="large"
            error={userFirstname ? null : errors.firstname}
          />
          <InputForm
            label="Lastname"
            placeholder="Enter Lastname"
            name="lastname"
            value={userLastname || lastname}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            size="large"
            error={userLastname ? null : errors.lastname}
          />
        </div>
        <InputForm
          label="City"
          placeholder="Enter City"
          name="city"
          value={userCity || city}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          size="large"
          error={userCity ? null : errors.city}
        />
        <InputForm
          label="Country"
          placeholder="Enter Country"
          name="country"
          value={userCountry || country}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          size="large"
          error={userCountry ? null : errors.country}
        />
        <InputForm
          label="Phone Number"
          placeholder="Enter Phone Number"
          name="phoneNumber"
          value={userPhoneNumber || phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          type="tel"
          size="large"
          error={userPhoneNumber ? null : errors.phoneNumber}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full text-white p-3 mt-6 mb-2"
          filled={true}
        >
          {isSubmitting && loading ? (
            <Spin indicator={<LoadingOutlined className="text-white" />} />
          ) : (
            'Save'
          )}
        </Button>
      </form>
    </div>
  );
};

export default ProfileForm;
