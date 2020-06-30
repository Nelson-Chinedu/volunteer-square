import React, { FunctionComponent } from 'react';
import { Col, Card } from 'antd';


const CardContainer: FunctionComponent<{}> = () => {

const { Meta } = Card;

  return (
    <>
      <Col span={6} className="c-col-card">
        <Card
          hoverable
          style={{ width: 250 }}
          cover={<img src="/images/dummy.jpeg" />}
        >
        <Meta className="text-left" description="This will be the event description" />
        </Card>
      </Col>
    </>
  )
};

export default CardContainer;
