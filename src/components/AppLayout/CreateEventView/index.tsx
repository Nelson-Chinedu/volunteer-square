import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { Breadcrumb } from 'antd';

import CreateEventForm from 'src/components/AppLayout/CreateEventView/CreateEventForm';
import DesktopSidebar from 'src/components/SharedLayout/Sidebar/DeskTopSidebar';
import DashboardNavbar from 'src/components/SharedLayout/Navbar/DashboardNavbar';


const CreateEventView: FunctionComponent<{}> = () => {
  return (
    <div className="flex">
      <DesktopSidebar />
      <div className="c-DashboardView-content w-full h-screen">
        <DashboardNavbar />
        <div className="py-12 mt-20 c-createEventView-breadcrumb">
          <Breadcrumb separator="">
            <Breadcrumb.Item>
              <span className="c-createEventView-breadcrumb-menu c-createEventView-menu-1">
               <Link href="/app/dashboard">
                <a> Home </a>
                </Link>
              </span>
            </Breadcrumb.Item>
            <Breadcrumb.Separator> &gt; </Breadcrumb.Separator>
            <Breadcrumb.Item>
              <span className="c-createEventView-breadcrumb-menu c-createEventView-menu-2">
                Create Event
              </span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div>
          <CreateEventForm />
        </div>
      </div>
    </div>
  )
};

export default CreateEventView;