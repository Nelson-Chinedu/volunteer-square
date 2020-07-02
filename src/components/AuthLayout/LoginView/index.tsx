import React, { FunctionComponent } from 'react';
import Link from 'next/link';

import LoginForm from './LoginForm';


const Login: FunctionComponent<{}> = () => {
  return (
    <div>
      <Link href="/">
        <a>
          <img src="/images/logoIcon.png" alt="" className="m-0 m-auto h-20"/>
        </a>
      </Link>
      <h4 className="text-center text-xl">Sign in to continue</h4>
      <LoginForm />
    </div>
  )
};

export default Login;
