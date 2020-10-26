import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  DashboardOutlined,
  LoginOutlined,
  UserOutlined,
  PlusOutlined,
  EyeOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import store from 'store';
import classnames from 'classnames';

import { Snackbar } from 'src/components/SharedLayout/Shared/Snackbar';

type Props = {
  handleCloseSidebar: () => void;
  closeSidebar: boolean;
  openSidebar: boolean;
};

const DesktopSidebar: FunctionComponent<Props> = ({handleCloseSidebar, closeSidebar, openSidebar}) => {
  const router = useRouter();

  const _handleLogout = () => {
    store.remove('__cnt');
    Snackbar('Message', 'Logout successfully', '#000', '#fff');
    router.push('/');
  };

  const mainClassname = classnames(`${closeSidebar ? 'hidden':'block'} ${openSidebar ? 'block': 'hidden'}`);
  return (
    <aside className={`c-DesktopSidebar h-screen fixed md:block ${mainClassname}`}>
      <div className="c-DesktopSidebar-top bg-white flex items-center justify-between">
        <img src="/images/logoBrand.png" height="" alt="logo" className="c-logo"/>
        <CloseOutlined className="cursor-pointer md:hidden md:mr-0 mr-5" onClick={handleCloseSidebar}/>
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
