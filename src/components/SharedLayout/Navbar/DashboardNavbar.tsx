import React, { FunctionComponent } from 'react';
import { MenuOutlined, BellOutlined } from '@ant-design/icons';

import Button from 'src/components/SharedLayout/Shared/Button';

const DashboardNavbar: FunctionComponent<{}> = () => {
  return (
    <div className="bg-white w-full flex items-center justify-between px-6 c-DashboardNavbar">
      <MenuOutlined className="cursor-pointer" />
      <div className="flex items-center">
        <Button type="button" className="bg-blue-700 px-6 py-2 rounded text-white">Create Event</Button>
        <BellOutlined className="ml-4" />
        <img src="/images/avatar.png" alt="profile picture" className="ml-4 c-DashboardNavbar-pic"/>
      </div>
    </div>
  )
};

export default DashboardNavbar;
