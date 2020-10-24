import React, { FunctionComponent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Button from 'src/components/SharedLayout/Shared/Button';

import callApi from 'src/utils/callApi';

const VerifyEmail: FunctionComponent<{}> = () => {
  const router = useRouter();
  const [responseCode, setResponseCode] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    const { token } = router.query;
    if (token) {
      const fetchedData = async () => {
        const response = await callApi({
          method: 'post',
          url: '/api/v1/verify-email/',
          data: { token },
        });
        const { status, message } = response;
        setResponseCode(status);
        setResponseMessage(message);
      };
      fetchedData();
    }
  }, [router.query.token]);

  if (
    responseCode &&
    responseCode !== 200 &&
    responseCode &&
    responseCode !== 202
  ) {
    return (
      <div
        className="c-verifyEmail text-black text-center mt-8 w-7/12 m-auto p-6 h-56 shadow-sm"
      >
        {responseMessage}
      </div>
    );
  }
  return (
    <div className="c-verifyEmail text-black text-center mt-8 w-7/12 m-auto p-6 h-56 shadow-sm">
      {responseMessage}
      <Link href="login">
        <Button
          type="button"
          className="w-2/4 bg-blue-700 text-white p-3 mt-6 mb-2"
        >
          Login
        </Button>
      </Link>
    </div>
  );
};

export default VerifyEmail;
