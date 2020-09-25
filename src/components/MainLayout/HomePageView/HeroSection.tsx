import React, { FunctionComponent } from 'react';
import Link from 'next/link';

import HomePageNavbar from 'src/components/SharedLayout/Navbar';

const HeroSection: FunctionComponent<{}> = () => {
  return (
    <header className="">
      <HomePageNavbar />
      <div className="flex c-heroSection items-center">
        <div className="c-heroSection-intro">
          <h2 className="text-white text-2xl m-0">
            Put Your Event In Front of
          </h2>
          <h2 className="text-white text-2xl m-0">Millions</h2>
          <Link href="/auth/signup">
            <a className="bg-red-400 px-8 py-3 rounded text-white">
              Get Started
            </a>
          </Link>
        </div>
        <div>
          <img src="/images/heroImage.png" />
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
