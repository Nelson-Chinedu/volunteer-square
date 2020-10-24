import React, { FunctionComponent, ReactNode } from 'react';
import { Row } from 'antd';

type Props = {
  gutter: any;
  children: ReactNode;
};

const GridContainer: FunctionComponent<Props> = ({ gutter, children }) => {
  return (
    <>
      <Row
        gutter={gutter}
        className="md:inline-flex items-center md:justify-center md:w-1/4 flex flex-col w-full"
      >
        {children}
      </Row>
    </>
  );
};

export default GridContainer;
