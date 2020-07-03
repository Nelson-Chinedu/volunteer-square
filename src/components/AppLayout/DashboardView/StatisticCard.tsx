import React, { FunctionComponent } from 'react';
import { Row, Col } from 'antd';

const StatisticCard: FunctionComponent<{}> = () => {
  return (
    <Row gutter={[32, 16]} className="flex justify-between c-StatisticCard">
      <Col span={6} >
        <h2>First Card</h2>
      </Col>
      <Col span={6} >
        <h2>Second card</h2>
      </Col>
      <Col span={6} >
        <h2>Third Card</h2>
      </Col>
      <Col span={6} >
        <h2>Fourth Card</h2>
      </Col>
    </Row>
  )
};

export default StatisticCard;
