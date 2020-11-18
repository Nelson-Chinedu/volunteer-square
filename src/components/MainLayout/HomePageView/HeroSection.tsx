import React, { FunctionComponent } from 'react';
import Link from 'next/link';

import HomePageNavbar from 'src/components/SharedLayout/Navbar';
import Button from 'src/components/SharedLayout/Shared/Button';

const HeroSection: FunctionComponent<{}> = () => {
  return (
    <header className="">
      <HomePageNavbar login="auth/login" signup="auth/signup" />
      <div className="flex c-heroSection items-center">
        <div className="md:w-1/2 w-full c-heroSection-intro">
          <h2 className="text-white md:text-5xl md:font-bold font-semibold text-3xl md:ml-12 ml-3 mb-8">
            Put Your Event In Front of Millions
          </h2>
          <Link href="/auth/signup">
            <Button
              type="button"
              className="bg-red-400 px-8 py-3 md:ml-12 ml-3 rounded text-white c-GetStarted">
              Get Started
            </Button>
          </Link>
        </div>
        <div className="hidden md:block">
          <img src="/images/heroImage.png" />
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
