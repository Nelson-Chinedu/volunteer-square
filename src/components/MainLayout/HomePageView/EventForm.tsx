import React, { FunctionComponent } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {useFormik} from 'formik';
import * as yup from 'yup';

import { CREATE_CONTACT } from 'src/queries';

import InputForm from 'src/components/SharedLayout/Shared/Input';
import Button from 'src/components/SharedLayout/Shared/Button';
import { Snackbar } from 'src/components/SharedLayout/Shared/Snackbar';

const validationSchema = yup.object().shape({
  fullname: yup.string().required('Required'),
  phoneNumber: yup.string().required('Required'),
  address: yup.string().required('Required')
});

const EventForm: FunctionComponent<{}> = () => {
  const router = useRouter();
  const [ createContact, { loading: userLoading }] = useMutation(CREATE_CONTACT);

  const _handleCreateContact = async () => {
    try {
      const userData = await createContact({
        variables: {
          name: fullname,
          telephone: phoneNumber,
          address,
          eventId: router.query.event
        }
      });
      if (userData) {
        const {
          data: {
            public: {
              createContact: { message }
            }
          }
        } = userData;
        Snackbar('Message', `${message}`, '#000', '#68d391');
        resetForm();
      }
    } catch (error) {
      Snackbar('Message', 'An error occured', '#000', '#fc8181');
    }
  };

  const formik = useFormik({
    initialValues: {
      fullname: '',
      phoneNumber: '',
      address: '',
    },
    onSubmit: _handleCreateContact,
    validationSchema,
  });

  const {
    values: { fullname, phoneNumber, address },
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
    } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <InputForm
        label="Fullname"
        placeholder="Enter Fullname"
        type="text"
        name="fullname"
        value={fullname}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.fullname}
        size="large"
      />
      <InputForm
        label="Phone Number"
        placeholder="Enter Phone Number"
        type="tel"
        name="phoneNumber"
        value={phoneNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.phoneNumber}
        size="large"
      />
      <InputForm
        label="Address"
        placeholder="Enter Address"
        type="textarea"
        name="address"
        value={address}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.address}
        size="large"
        className="w-full h-32 resize-none"
        autoSize={{minRows: 5, maxRows: 5}}
      />
      <Button
        type="submit"
        disabled={isSubmitting || !fullname || !phoneNumber || !address}
        filled={true}
        className="w-full text-white p-3 mt-6 mb-2"
      >
        {isSubmitting && userLoading ? (
          <Spin indicator={<LoadingOutlined className="text-white" />} />
        ) : (
          'Volunteer'
        )}
      </Button>
    </form>
  );
}

export default EventForm;
