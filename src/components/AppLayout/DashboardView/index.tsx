import React, { FunctionComponent, useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
import store from 'store';
import { useQuery } from '@apollo/react-hooks';

import EmptyCard from 'src/components/AppLayout/DashboardView/EmptyCard';

import DesktopSidebar from 'src/components/SharedLayout/Sidebar/DeskTopSidebar';
import DashboardNavbar from 'src/components/SharedLayout/Navbar/DashboardNavbar';
import { Snackbar } from 'src/components/SharedLayout/Shared/Snackbar';
import LazyLoad from 'src/components/SharedLayout/Shared/LazyLoad';
import GridContainer from 'src/components/SharedLayout/Shared/GridContainer';
import CardContainer from 'src/components/SharedLayout/Shared/CardContainer';

import { GET_USER_EVENT } from 'src/queries';

const DashboardView: FunctionComponent<{}> = () => {
  const [skip, setSkip] = useState(null);
  const [take, setTake] = useState(null);
  const [visible, setVisible] = useState(false);
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
    setSkip(0);
    setTake(10);
  }, []);

  const { data, loading } = useQuery(GET_USER_EVENT, {
    variables: {
      skip,
      take,
    },
  });

  if (!data || loading) {
    return (
      <>
        <div className="mb-8">
          <div className="md:flex md:justify-around md:items-center w-full">
            <LazyLoad
              active={true}
              shape="square"
              size="large"
              width={260}
              height={250}
            />
            <LazyLoad
              active={true}
              shape="square"
              size="large"
              width={260}
              height={250}
            />
            <LazyLoad
              active={true}
              shape="square"
              size="large"
              width={260}
              height={250}
            />
            <LazyLoad
              active={true}
              shape="square"
              size="large"
              width={260}
              height={250}
            />
          </div>
        </div>
      </>
    );
  }

  const {
    getUserEvents: { events },
  } = data.client;

  const _showDrawer = () => {
    setVisible(true);
  };

  const _onClose = () => {
    setVisible(false)
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
              <span className="c-DashboardView-breadcrumb-menu c-breadcrumb-menu-1">
                <Link href="/app/dashboard">
                  <a> Home </a>
                </Link>
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
        {events ? (
          <div className="box-border mt-4">
          {events.map((event: any) => {
            const { id, name } = event;
            return (
              <GridContainer gutter={[8, 48]} key={id}>
                <div>
                  <CardContainer title={name} id={id}>
                    <Link href="/app/event/[event]" as={`/app/event/${id}`}>
                      <a className="block bg-red-400 w-full py-2 mt-4 text-white hover:text-white hover:bg-red-500">
                        View Volunteer
                      </a>
                    </Link>
                  </CardContainer>
                </div>
              </GridContainer>
            );
          })}
        </div>
        ) : (
        <div className="w-auto my-12 c-DashboardView-content-area">
          <EmptyCard />
        </div>
        )
        }
      </div>
    </div>
  );
};

export default DashboardView;
