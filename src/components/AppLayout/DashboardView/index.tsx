import React, { FunctionComponent, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { useRouter } from 'next/router';
import store from 'store';

import EmptyCard from 'src/components/AppLayout/DashboardView/EmptyCard';

import DesktopSidebar from 'src/components/SharedLayout/Sidebar/DeskTopSidebar';
import DashboardNavbar from 'src/components/SharedLayout/Navbar/DashboardNavbar';
import { Snackbar } from 'src/components/SharedLayout/Shared/Snackbar';

const DashboardView: FunctionComponent<{}> = () => {
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
      <div className="c-DashboardView-content w-full">
        <DashboardNavbar />
        <div className="py-12 mt-20 c-DashboardView-breadcrumb">
          <Breadcrumb separator="">
            <Breadcrumb.Item>
              <span className="c-DashboardView-breadcrumb-menu c-breadcrumb-menu-1">
                Home
              </span>
            </Breadcrumb.Item>
            <Breadcrumb.Separator> &gt; </Breadcrumb.Separator>
            <Breadcrumb.Item>
              <span className="c-DashboardView-breadcrumb-menu c-breadcrumb-menu-2">
                Dashboard
              </span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="w-auto c-DashboardView-content-area">
          <EmptyCard />
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
