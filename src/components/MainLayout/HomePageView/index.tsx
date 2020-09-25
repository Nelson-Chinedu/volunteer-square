import React, { FunctionComponent } from 'react';

import HeroSection from './HeroSection';
import EventSearch from './EventSearch';
import EventCategory from './EventCategory';
import Footer from './Footer';

const HomePageView: FunctionComponent<{}> = () => {
  return (
    <div>
      <HeroSection />
      <EventSearch />
      <EventCategory title="Events near you" seeAll={true} />
      <EventCategory title="Tech Events" category="Tech" seeAll={true} />
      <EventCategory
        title="Sport &amp; Fitness"
        category="Sport and Fitness"
        seeAll={true}
      />
      <Footer />
    </div>
  );
};

export default HomePageView;
