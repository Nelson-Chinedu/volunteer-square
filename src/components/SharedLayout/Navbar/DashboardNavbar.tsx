import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { MenuOutlined, BellOutlined } from '@ant-design/icons';

import Button from 'src/components/SharedLayout/Shared/Button';

type Props = {
  handleOpenSidebar: () => void;
};

const DashboardNavbar: FunctionComponent<Props> = ({handleOpenSidebar}) => {
  return (
    <div
      className="bg-white w-full flex items-center justify-between px-6 fixed z-50 c-DashboardNavbar"
    >
      <MenuOutlined className={`cursor-pointer `} onClick={handleOpenSidebar}/>
      <div className="flex items-center">
        <Link href="/app/create-event">
          <a>
            <Button
              type="button"
              className="bg-blue-700 px-6 py-2 rounded text-white"
            >
              Create Event
            </Button>
          </a>
        </Link>
        <BellOutlined className="ml-4" />
        <img
          src="/images/avatar.png"
          alt="profile picture"
          className="ml-4 md:block hidden c-DashboardNavbar-pic"
        />
      </div>
    </div>
  );
};

export default DashboardNavbar;
