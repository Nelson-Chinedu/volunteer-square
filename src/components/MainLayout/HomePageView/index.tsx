import React, { FunctionComponent } from 'react';

import HeroSection from './HeroSection';
import EventSearch from './EventSearch';
import Events from './Events';

const HomePageView: FunctionComponent<{}> = () => {
  return (
    <div>
      <HeroSection />
      <EventSearch />
      <Events/>
    </div>
  )
};

export default HomePageView;
