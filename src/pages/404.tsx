import React, { FunctionComponent } from 'react';
import Link from 'next/link';

const PageNotFound: FunctionComponent<{}> = () => {
  return (
    <div className="mt-20 text-center">
      <h2>Page Not Found</h2>
      <Link href="/">
        <a className="text-blue-400 underline hover:no-underline">
          Return to homepage
        </a>
      </Link>
    </div>
  );
};

export default PageNotFound;
