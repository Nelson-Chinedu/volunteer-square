import React, { FunctionComponent, useState } from 'react';
import Link from 'next/link';

const HomePageNavbar: FunctionComponent<{}> = () => {

  const [ isExpanded, toggleExpansion ] = useState(false);

  const _handleButton = () => {
    toggleExpansion(!isExpanded);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6 h-12">
        <img src="/images/logoBrand.png" height="200px" alt="logo"/>
      </div>
      <div className="block lg:hidden">
        <button onClick={_handleButton}
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
          </svg>
        </button>
      </div>
      <div className={`${ isExpanded ? `block` : `hidden` }
        w-full block  lg:flex lg:items-center lg:w-auto`}>
        <div className="text-sm lg:flex-grow">
          <Link href="#">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Home
            </a>
          </Link>
          <Link href="#">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Events
            </a>
          </Link>
          <Link href="#">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Features
            </a>
          </Link>
          <Link href="#">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Contact Us
            </a>
          </Link>
          <Link href="auth/login">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Login
            </a>
          </Link>
        </div>
        <div>
          <Link href="#">
            <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Signup</a>
          </Link>
        </div>
      </div>
    </nav>
  )
};

export default HomePageNavbar;
