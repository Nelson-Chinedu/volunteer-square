import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { Empty } from 'antd';

import Button from 'src/components/SharedLayout/Shared/Button';

const EmptyCard: FunctionComponent<{}> = () => {
  return (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{ height: 100, margin: '0px auto', width: 150 }}
      description={<span>No Event Created</span>}
      className="m-0 m-auto text-center"
    >
      <Link href="/app/create-event">
        <a>
          <Button
            type="button"
            className="bg-red-500 hover:bg-red-400 px-6 py-2 rounded text-white"
          >
            Create Event
          </Button>
        </a>
      </Link>
    </Empty>
  );
};

export default EmptyCard;
