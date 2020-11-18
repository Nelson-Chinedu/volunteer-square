import React, { FunctionComponent, useState } from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useQuery} from '@apollo/react-hooks';
import { Breadcrumb, Collapse, Result } from 'antd';

import DashboardNavbar from 'src/components/SharedLayout/Navbar/DashboardNavbar';
import DesktopSidebar from 'src/components/SharedLayout/Sidebar/DeskTopSidebar';
import LazyLoad from 'src/components/SharedLayout/Shared/LazyLoad';

import {GET_EVENT_VOLUNTEERS} from 'src/queries';

const { Panel } = Collapse;

const Event: FunctionComponent<{}> = () => {
  const router = useRouter();

  const {data, loading} = useQuery(GET_EVENT_VOLUNTEERS, {
    variables: {eventId: router.query.event}
  });

  const [visible, setVisible] = useState(false);

  const _showDrawer = () => {
    setVisible(true);
  };

  const _onClose = () => {
    setVisible(false)
  }
  if (!data || loading) {
    return (
      <div className="container">
      <LazyLoad
        active={true}
        shape="square"
        size="large"
        width="100%"
        height="30px"
      />
      <LazyLoad
        active={true}
        shape="square"
        size="large"
        width="100%"
        height="30px"
      />
      </div>
    );
  }

  const {
    getEventVolunteers: { volunteers },
  } = data.client;

  if (volunteers.length <= 0) {
    return (
      <div className="mb-8">
        <Result
          status="404"
          subTitle="Sorry, No volunteer for this event yet."
          extra={
            <Link href="/app/dashboard">
              <a
                className="bg-red-400 px-4 py-2 leading-none border rounded text-white hover:border-transparent hover:text-white hover:bg-red-500"
              >
                Back Home
              </a>
            </Link>}
        />
      </div>
    );
  }
  return (
    <div className="flex">
      <DesktopSidebar
        visible={visible}
        onClose={_onClose}
      />
      <div className="c-DashboardView-content w-full">
        <DashboardNavbar showDrawer={_showDrawer}/>
        <div className="py-8 px-6 md:px-10 mt-20 c-DashboardView-breadcrumb">
          <Breadcrumb separator="">
            <Breadcrumb.Item>
              <span
                className="underline hover:no-underline cursor-pointer c-DashboardView-breadcrumb-menu c-breadcrumb-menu-1"
              >
                <Link href="/app/dashboard">
                  <a> Home </a>
                </Link>
              </span>
            </Breadcrumb.Item>
            <Breadcrumb.Separator> &gt; </Breadcrumb.Separator>
            <Breadcrumb.Item>
              <span className="c-DashboardView-breadcrumb-menu c-breadcrumb-menu-2">
                View Volunteer
              </span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="w-4/5 md:w-1/2 mx-auto my-8">
          {volunteers.map((volunteer: any) => {
            const {id, name, telephone, address} = volunteer;
            return (
              <Collapse key={id}>
                <Panel header={name} key={id}>
                  <p>{telephone}</p>
                  <p>{address}</p>
                </Panel>
              </Collapse>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Event;
