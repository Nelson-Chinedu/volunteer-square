import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { Breadcrumb } from 'antd';

import DesktopSidebar from 'src/components/SharedLayout/Sidebar/DeskTopSidebar';
import DashboardNavbar from 'src/components/SharedLayout/Navbar/DashboardNavbar';
import ProfileForm from 'src/components/AppLayout/Profile/ProfileForm';


const Profile: FunctionComponent<{}> = () => {
  return (
    <div className="flex">
    <DesktopSidebar />
    <div className="c-DashboardView-content w-full h-screen">
      <DashboardNavbar />
      <div className="py-12 mt-20 c-profileView-breadcrumb">
        <Breadcrumb separator="">
          <Breadcrumb.Item>
            <span className="c-profileView-breadcrumb-menu c-profileView-menu-1">
             <Link href="/app/dashboard">
              <a> Home </a>
              </Link>
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Separator> &gt; </Breadcrumb.Separator>
          <Breadcrumb.Item>
            <span className="c-profileView-breadcrumb-menu c-profileView-menu-2">
              Profile
            </span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div>
        <ProfileForm />
      </div>
    </div>
  </div>
  )
};

export default Profile;


