import React, { FunctionComponent } from 'react';

import Button from 'src/components/SharedLayout/Shared/Button';

type Props = {
  children:any;
};

const SocialLogin: FunctionComponent<Props> = ({children}) => {

  return (
    <>
      <Button
        type="button"
        className="flex justify-center w-full border border-gray p-3 mb-3 items-center"
      >
        {children}
      </Button>
    </>
  );
};

export default SocialLogin;
