import React, { FunctionComponent, ReactNode } from 'react';
import { Row } from 'antd';
import 'antd/dist/antd.css';


type Props = {
  gutter: any;
  children: ReactNode;
}

const GridContainer: FunctionComponent<Props> = ({gutter, children}) => {
  return (
    <>
      <Row gutter={gutter}>
        {children}
      </Row>
    </>
  )
};

export default GridContainer;
