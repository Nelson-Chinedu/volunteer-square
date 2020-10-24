import React, { FunctionComponent } from 'react';

import Event from 'src/components/MainLayout/HomePageView/Event';
import HomePageNavbar from 'src/components/SharedLayout/Navbar';

const AllEvents: FunctionComponent<{}> = () => {
  return (
    <>
      <HomePageNavbar login="/auth/login" signup="/auth/signup" />
      <div className="mt-20">
        <Event />
      </div>
    </>
  );
};

export default AllEvents;
