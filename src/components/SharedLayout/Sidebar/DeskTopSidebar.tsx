import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  DashboardOutlined,
  LoginOutlined,
  UserOutlined,
  PlusOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import store from 'store';
import { notification } from 'antd';

const DesktopSidebar: FunctionComponent<{}> = () => {
  const router = useRouter();

  const _handleLogout = () => {
    store.remove('__cnt');
    notification.success({
      message: 'Message',
      description: 'Logout successfully',
    });
    router.push('/');
  };

  return (
    <aside className="c-DesktopSidebar h-screen fixed">
      <div className="c-DesktopSidebar-top bg-white">
        <img src="/images/logoBrand.png" height="" alt="logo" className="c-logo"/>
      </div>
      <div className="c-DesktopSidebar-bottom ">
        <div className="c-DesktopSidebar-bottom-profile">
          <img
            src="/images/avatar.png"
            alt="profile picture"
            className="m-auto"
          />
        </div>
        <h4 className="text-white text-center capitalize c-DesktopSidebar-name">
          Howdy Nelson
        </h4>
        <ul className="c-DesktopSidebar-bottom-menu m-0">
          <Link href="/app/dashboard">
            <a>
              <li className="text-white text-left active flex items-center">
                <DashboardOutlined className="pr-2" /> Dashboard
              </li>
            </a>
          </Link>
          <Link href="/app/create-event">
            <a>
              <li className="text-white text-left flex items-center">
                <PlusOutlined className="pr-2" /> Create Event
              </li>
            </a>
          </Link>
          <Link href="/app/view-event">
            <a>
              <li className="text-white text-left flex items-center">
                <EyeOutlined className="pr-2" /> View Event
              </li>
            </a>
          </Link>
          <Link href="/app/profile">
            <a>
              <li className="text-white text-left flex items-center">
                <UserOutlined className="pr-2" /> Profile
              </li>
            </a>
          </Link>
          <a onClick={_handleLogout}>
            <li className="text-white text-left flex items-center">
              <LoginOutlined className="pr-2" /> Logout
            </li>
          </a>
        </ul>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
