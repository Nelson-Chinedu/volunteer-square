import React, { FunctionComponent } from 'react';
import Link from 'next/link';

import ResetForm from 'src/components/AuthLayout/ResetPassword/ResetForm';

const ResetPassword: FunctionComponent<{}> = () => {
  return (
    <div>
      <Link href="/">
        <a>
          <img src="/images/logoIcon.png" alt="" className="m-0 m-auto h-20"/>
        </a>
      </Link>
      <h4 className="text-center text-xl">Change your password</h4>
      <ResetForm />
    </div>
  )
};

export default ResetPassword;
