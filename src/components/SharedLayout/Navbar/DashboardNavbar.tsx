import React, { FunctionComponent, useEffect, useState } from 'react';
import Link from 'next/link';
import { DownOutlined, MenuOutlined } from '@ant-design/icons';
import store from 'store';
import { Menu, Dropdown, Avatar } from 'antd';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

import Button from 'src/components/SharedLayout/Shared/Button';
import { Snackbar } from 'src/components/SharedLayout/Shared/Snackbar';

import {GET_PROFILE} from 'src/queries';

type Props = {
  showDrawer: () => void;
};

const DashboardNavbar: FunctionComponent<Props> = ({showDrawer}) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const router = useRouter();
  const {loading, data} = useQuery(GET_PROFILE);

  useEffect(() => {
    if (data && !loading){
      const {getUserProfile} = data.client;
      setFirstname(getUserProfile.firstname.charAt(0));
      setLastname(getUserProfile.lastname.charAt(0));
    }
  },[data]);

  const _handleLogout = () => {
    store.remove('__cnt');
    Snackbar('Message', 'Logout successfully', '#000', '#fff');
    router.push('/');
  };

  const menu = (
    <Menu className="w-48">
      <Menu.Item>
        <Link href="/app/profile">
          <a>
            Profile
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <a onClick={_handleLogout}>
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      className="bg-white w-full flex items-center justify-between px-6 fixed z-50 c-DashboardNavbar"
    >
      <div className="flex items-center">
        <Link href="/app/dashboard">
          <a>
            <img src="/images/logoBrand.png" height="" alt="logo" className="c-logo hidden md:block"/>
          </a>
        </Link>
        <MenuOutlined className="block md:hidden" onClick={showDrawer}/>
      </div>
      <div className="flex items-center">
        <Link href="/app/create-event">
          <Button
            type="button"
            className="bg-red-500 hover:bg-red-400 border-0 rounded border-white px-6 py-2 md:mr-4 text-white c-CreateEvent"
          >
            Create Event
          </Button>
        </Link>
        <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft" className="hidden md:flex">
          <div className="flex items-center justify-around cursor-pointer ">
            <Avatar>
              {firstname.toUpperCase()}{lastname.toUpperCase()}
            </Avatar>
            <DownOutlined />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default DashboardNavbar;
