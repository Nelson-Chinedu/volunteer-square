import React, { FunctionComponent, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Breadcrumb } from 'antd';
import store from 'store';

import ProfileForm from 'src/components/AppLayout/ProfileView/ProfileForm';

import DesktopSidebar from 'src/components/SharedLayout/Sidebar/DeskTopSidebar';
import DashboardNavbar from 'src/components/SharedLayout/Navbar/DashboardNavbar';
import { Snackbar } from 'src/components/SharedLayout/Shared/Snackbar';

const Profile: FunctionComponent<{}> = () => {
  const router = useRouter();

  const storageDetails = store.get('__cnt');
  useEffect(() => {
    if (!storageDetails) {
      router.push('/auth/login');
      Snackbar(
        'Permission denied',
        'You need to be logged in to view that page',
        '#000',
        '#fc8181'
      );
    }
  }, []);
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
  );
};

export default Profile;