import React, { FunctionComponent, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Breadcrumb } from 'antd';
import store from 'store';

import CreateEventForm from 'src/components/AppLayout/CreateEventView/CreateEventForm';

import DesktopSidebar from 'src/components/SharedLayout/Sidebar/DeskTopSidebar';
import DashboardNavbar from 'src/components/SharedLayout/Navbar/DashboardNavbar';
import { Snackbar } from 'src/components/SharedLayout/Shared/Snackbar';


const CreateEventView: FunctionComponent<{}> = () => {
  const router = useRouter();

  const storageDetails = store.get('__cnt');
  useEffect(() => {
    if (!storageDetails){
      router.push('/auth/login');
      Snackbar(
        'Permission denied',
        'You need to be logged in to view that page',
        '#000',
        '#fc8181'
      );
    }
  },[]);

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