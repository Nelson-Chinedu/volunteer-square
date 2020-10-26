import React, { FunctionComponent, useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { useRouter } from 'next/router';
import store from 'store';

import EmptyCard from 'src/components/AppLayout/DashboardView/EmptyCard';

import DesktopSidebar from 'src/components/SharedLayout/Sidebar/DeskTopSidebar';
import DashboardNavbar from 'src/components/SharedLayout/Navbar/DashboardNavbar';
import { Snackbar } from 'src/components/SharedLayout/Shared/Snackbar';

const DashboardView: FunctionComponent<{}> = () => {
  const [openSidebar,setOpenSidebar] = useState(false);
  const [closeSidebar, setCloseSidebar] = useState(false);

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

  const _handleCloseSidebar = () => {
    setCloseSidebar(true);
    setOpenSidebar(false);
  };

  const _handleOpenSidebar = () => {
    setOpenSidebar(true);
    setCloseSidebar(false);
  }

  return (
    <div className="flex">
      <DesktopSidebar
        handleCloseSidebar={_handleCloseSidebar}
        closeSidebar={closeSidebar}
        openSidebar={openSidebar}
      />
      <div className="c-DashboardView-content w-full">
        <DashboardNavbar handleOpenSidebar={_handleOpenSidebar} />
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
