import React, { FunctionComponent, ReactNode } from 'react';
import { Form } from 'antd';

type Props = {
  primaryColor?: string;
  children: ReactNode;
  type: 'submit' | 'button';
  className: string;
  item?: any;
}

const Button: FunctionComponent<Props> = ({
  type,
  className,
  children,
  item
}) => {
  return (
    <Form.Item {...item} className="c-button-wrapper">
      <button type={type} className={className} >
        {children}
      </button>
    </Form.Item>
  )
};

export default Button;