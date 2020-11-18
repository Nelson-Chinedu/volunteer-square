import React, { FunctionComponent, useEffect } from 'react';
import { useRouter } from 'next/router';
import store from 'store';
import {hotjar} from 'react-hotjar';

import HeroSection from 'src/components/MainLayout/HomePageView/HeroSection';
import EventSearch from 'src/components/MainLayout/HomePageView/EventSearch';
import EventCategory from 'src/components/MainLayout/HomePageView/EventCategory';

import Footer from 'src/components/SharedLayout/Shared/Footer';

const HomePageView: FunctionComponent<{}> = () => {
  const router = useRouter();

  const storageDetails = store.get('__cnt');
  const hjid = Number(process.env.hjid);
  const hjsv = Number(process.env.hjsv);

  useEffect(() => {
    if (storageDetails) {
      router.push('/app/dashboard');
    }
    hotjar.initialize(hjid, hjsv);
  }, []);
  return (
    <>
      <HeroSection />
      <EventSearch />
      <EventCategory headline="Events near you" seeAll={true} />
      <EventCategory headline="Tech Events" category="Tech" seeAll={true} />
      <EventCategory
        headline="Sport &amp; Fitness"
        category="Sport and Fitness"
        seeAll={true}
      />
      <Footer />
    </>
  );
};

export default HomePageView;
