import React, { FunctionComponent } from 'react';
import { Breadcrumb } from 'antd';

import DesktopSidebar from 'src/components/SharedLayout/Sidebar/DeskTopSidebar';
import DashboardNavbar from 'src/components/SharedLayout/Navbar/DashboardNavbar';
import EmptyCard from 'src/components/AppLayout/DashboardView/EmptyCard';

const DashboardView: FunctionComponent<{}> = () => {
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
          <EmptyCard/>
        </div>
      </div>
    </div>
  )
};

export default DashboardView;
