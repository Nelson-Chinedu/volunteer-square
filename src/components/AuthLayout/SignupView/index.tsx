import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import SignupForm from './SignupForm';

const Signup: FunctionComponent<{}> = () => {
  return (
    <div>
      <Link href="/">
        <a>
          <img src="/images/logoIcon.png" alt="" className="m-0 m-auto h-20"/>
        </a>
      </Link>
      <h4 className="text-center text-xl">Sign up to continue</h4>
      <SignupForm />
    </div>
  )
};

export default Signup;
