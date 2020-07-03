import React, { FunctionComponent } from 'react';

import HomePageNavbar from 'src/components/SharedLayout/Navbar';
import Button from 'src/components/SharedLayout/Shared/Button';


const HeroSection: FunctionComponent<{}> = () => {
  return (
    <header className="c-heroSection">
      <HomePageNavbar />
      <div className="c-heroSection-intro">
        <h2 className="text-white text-4xl m-0">Discover Events Around You</h2>
        <h2 className="text-white text-4xl m-0">To Volunteer</h2>
        <Button type="button" className="bg-red-400 mt-6 px-8 py-3 rounded text-white">Get Started</Button>
      </div>
    </header>
  )
}

export default HeroSection;
