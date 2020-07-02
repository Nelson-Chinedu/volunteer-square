import React, { FunctionComponent } from 'react';
import {Row, Col} from 'antd';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';

const SocialLogin: FunctionComponent<{}> = () => {
  return (
    <Row gutter={[16, 16]} justify="space-between" className="c-loginForm-social">
      <Col span={10} className="border border-gray text-center">
        <div className="flex items-center justify-center">
          <GoogleOutlined className="mr-2" /> Sign In With Google
        </div>
      </Col>
      <Col span={10} className="border border-gray text-center">
        <div className="flex items-center justify-center">
          <FacebookOutlined className="mr-2" /> Sign In With Facebook
        </div>
      </Col>
    </Row>
  )
};

export default SocialLogin;

