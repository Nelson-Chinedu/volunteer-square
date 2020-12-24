import React, { FunctionComponent } from 'react';

import Button from 'src/components/SharedLayout/Shared/Button';

type Props = {
  children:any;
  handleSocialAuth?: () => void
};

const SocialLogin: FunctionComponent<Props> = ({children, handleSocialAuth}) => {
  return (
    <>
      <Button
        type="button"
        className="flex justify-center w-full  border border-gray p-3 mb-3 items-center"
        handleClick={handleSocialAuth}
      >
        {children}
      </Button>
    </>
  );
};

export default SocialLogin;
