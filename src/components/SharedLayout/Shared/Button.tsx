import React, { FunctionComponent, ReactNode } from 'react';
import { Form } from 'antd';

type Props = {
  primaryColor?: string;
  children: ReactNode;
  type: 'submit' | 'button';
  className: string;
}

const Button: FunctionComponent<Props> = ({
  type,
  className,
  children,
}) => {
  return (
    <Form.Item  className="c-button-wrapper">
      <button type={type} className={className}>
        {children}
      </button>
    </Form.Item>
  )
};

export default Button;