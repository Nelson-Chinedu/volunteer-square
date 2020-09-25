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
        className="inline-flex items-center justify-center w-1/4 "
      >
        {children}
      </Row>
    </>
  );
};

export default GridContainer;
