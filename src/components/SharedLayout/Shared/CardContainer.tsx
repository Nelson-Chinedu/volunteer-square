import React, { FunctionComponent } from 'react';
import { Col, Card } from 'antd';

type Props = {
  id: string;
  description: string;
  children: React.ReactNode;
};

const CardContainer: FunctionComponent<Props> = ({ description, children }) => {
  const { Meta } = Card;

  return (
    <>
      <Col span={6} className="c-col-card">
        <Card
          hoverable
          style={{ width: 250 }}
          cover={<img src="/images/dummy.jpeg" />}
        >
          <Meta className="text-left" description={description} />
          {children}
        </Card>
      </Col>
    </>
  );
};

export default CardContainer;
