import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';

import Events from 'src/components/MainLayout/HomePageView/EventCategory';
import HomePageNavbar from 'src/components/SharedLayout/Navbar';

const AllEvents: FunctionComponent<{}> = () => {
  const router = useRouter();
  const { event } = router.query;

  return (
    <>
      <HomePageNavbar login="auth/login" signup="auth/signup" />
      <div className="mt-20">
        <Events headline={event} category={event} seeAll={false} />
      </div>
    </>
  );
};

export default AllEvents;
