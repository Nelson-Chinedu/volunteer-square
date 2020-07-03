import React, { FunctionComponent } from 'react';
import { Empty } from 'antd';

import Button from 'src/components/SharedLayout/Shared/Button';

const EmptyCard: FunctionComponent<{}> = () => {
  return (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{ height: 100, margin: '0px auto', width: 150 }}
      description={
        <span>
          No Event Created
        </span>
      }
      className="m-0 m-auto text-center"
    >
      <Button
        type="button"
        className="bg-blue-700 px-6 py-2 rounded text-white"
      >
        Create Event
      </Button>
    </Empty>
  )
};

export default EmptyCard;
