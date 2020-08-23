import React, { FunctionComponent, ReactNode } from 'react';
import { Form } from 'antd';
import classnames from 'classnames';

type Props = {
  primaryColor?: string;
  children: ReactNode;
  type: 'submit' | 'button';
  className: string;
  disabled: boolean;
  filled: boolean;
};

const Button: FunctionComponent<Props> = ({
  type,
  className,
  children,
  disabled,
  filled,
  ...others
}) => {
  const mainClassNames = classnames('w-full rounded cursor-pointer', {
    'bg-blue-700': filled && !disabled,
    'bg-gray-700 cursor-not-allowed': disabled,
  });
  return (
    <Form.Item className="c-button-wrapper">
      <button
        type={type}
        className={`${mainClassNames} ${className}`}
        disabled={disabled}
        {...others}
      >
        {children}
      </button>
    </Form.Item>
  );
};

export default Button;
