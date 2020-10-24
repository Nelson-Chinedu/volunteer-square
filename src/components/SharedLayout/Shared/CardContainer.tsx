import React, { FunctionComponent } from 'react';
import { Col, Card } from 'antd';

type Props = {
  id: string;
  title?: string;
  date?: string;
  description?: string;
  children: React.ReactNode;
};

const CardContainer: FunctionComponent<Props> = ({ children, title, date }) => {
  const { Meta } = Card;

  return (
    <>
      <Col span={6} className="c-col-card">
        <Card
          hoverable
          style={{ width: 250 }}
          cover={<img src="/images/dummy.jpeg" />}
        >
          <Meta className="text-left" title={date} description={title} />
          {children}
        </Card>
      </Col>
    </>
  );
};

export default CardContainer;
