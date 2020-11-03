import React, { FunctionComponent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import { Drawer } from 'antd';
import {
  DashboardOutlined,
  LoginOutlined,
  UserOutlined,
  PlusOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import store from 'store';

import { Snackbar } from 'src/components/SharedLayout/Shared/Snackbar';

import { GET_PROFILE } from 'src/queries';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const DesktopSidebar: FunctionComponent<Props> = ({visible, onClose}) => {
  const router = useRouter();
  const [userFirstname, setUserFirstname] = useState('');
  const [userLastname, setUserLastname] = useState('');
  const { data } = useQuery(GET_PROFILE);

  useEffect(() => {
    if (data) {
      const { getUserProfile } = data.client;
      setUserFirstname(getUserProfile.firstname);
      setUserLastname(getUserProfile.lastname);
    }
  }, [data]);

  const _handleLogout = () => {
    store.remove('__cnt');
    Snackbar('Message', 'Logout successfully', '#000', '#fff');
    router.push('/');
  };

  return (
    <>
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        key="left"
        className="block md:hidden p-0"
      >
        <div className="c-DesktopSidebar-top bg-white flex items-center justify-between mt-2 mb-4 md:mt-0 md:mb-0">
          <img src="/images/logoBrand.png" height="" alt="logo" className="c-logo"/>
          <CloseOutlined className="cursor-pointer md:hidden md:mr-0 mr-5" onClick={onClose}/>
        </div>
        <div className="c-DesktopSidebar-bottom-profile mb-12">
          <img
            src="/images/avatar.png"
            alt="profile picture"
            className="m-auto w-40 mb-4"
          />
          <h4 className="text-center capitalize c-DesktopSidebar-name">
            {userFirstname} {userLastname}
          </h4>
        </div>
        <ul className="c-DesktopSidebar-bottom-menu m-0">
        <Link href="/app/dashboard">
          <a>
            <li className=" text-left active flex items-center">
              <DashboardOutlined className="pr-2" /> Home
            </li>
          </a>
        </Link>
        <Link href="/app/create-event">
          <a>
            <li className=" text-left flex items-center">
              <PlusOutlined className="pr-2" /> Create Event
            </li>
          </a>
        </Link>
        <Link href="/app/profile">
          <a>
            <li className=" text-left flex items-center">
              <UserOutlined className="pr-2" /> Profile
            </li>
          </a>
        </Link>
        <a onClick={_handleLogout}>
          <li className=" text-left flex items-center">
            <LoginOutlined className="pr-2" /> Logout
          </li>
        </a>
        </ul>
      </Drawer>
    </>
  );
};

export default DesktopSidebar;
