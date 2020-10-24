import React, { FunctionComponent, useState } from 'react';
import Link from 'next/link';
type Props = {
  login: string;
  signup: string;
};

const HomePageNavbar: FunctionComponent<Props> = ({login, signup}) => {
  const [isExpanded, toggleExpansion] = useState(false);

  const _handleButton = () => {
    toggleExpansion(!isExpanded);
  };

  return (
    <nav
      className="fixed top-0 w-full bg-white z-10 flex items-center justify-between flex-wrap p-3 c-Navbar"
    >
      <div className="flex items-center flex-shrink-0 text-white mr-6 h-12">
        <Link href="/">
          <a>
            <img src="/images/logoBrand.png" height="200px" alt="logo" />
          </a>
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={_handleButton}
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`${isExpanded ? `block` : `hidden`}
        w-full block  lg:flex lg:items-center lg:w-auto c-Navbar-menu`}
      >
        <div className="text-sm lg:flex-grow">
          <Link href={login}>
            <a className="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-white mr-4">
              Login
            </a>
          </Link>
        </div>
        <div>
          <Link href={signup}>
            <a
              className="inline-block bg-red-400 text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-white hover:bg-red-500 mt-4 lg:mt-0 c-Navbar-signup"
            >
              Create Event
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default HomePageNavbar;
