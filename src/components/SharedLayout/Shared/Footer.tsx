import React, { FunctionComponent } from 'react';

const Footer: FunctionComponent<{}> = () => {
  return (
    <div className="md:flex md:items-center md:justify-between bg-black p-10">
      <p className="text-white">All rights reserved &copy; Volunteer Square</p>
      <div>
        <p className="text-white">Coming soon on</p>
        <div className="md:flex">
          <img src="/images/apple.svg" className="mr-4" />
          <img src="/images/google-play.svg" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
