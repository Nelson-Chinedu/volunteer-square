import React, { FunctionComponent } from 'react';

const Footer: FunctionComponent<{}> = () => {
  return (
    <div className="md:flex md:items-center md:justify-between bg-black p-10">
      <p className="text-white">All rights reserved &copy; Volunteer Square</p>
      <div className="mt-4 md:mt-0">
        <p className="text-white mb-1 md:mb-0">Coming soon on</p>
        <div className="flex">
          <img src="/images/apple.svg" className="w-2/5 mr-2" />
          <img src="/images/google-play.svg" className="w-2/5" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
