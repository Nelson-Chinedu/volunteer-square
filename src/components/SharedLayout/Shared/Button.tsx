import React, { FunctionComponent, ReactNode } from 'react';
import { Form } from 'antd';
import classnames from 'classnames';

type Props = {
  primaryColor?: string;
  children: ReactNode;
  type: 'submit' | 'button';
  className: string;
  disabled?: boolean;
  filled?: boolean;
  handleClick?: () => void;
};

const Button: FunctionComponent<Props> = ({
  type,
  className,
  children,
  disabled,
  filled,
  handleClick,
  ...others
}) => {
  const mainClassNames = classnames('rounded cursor-pointer', {
    'bg-blue-700': filled && !disabled,
    'bg-gray-500': disabled,
  });
  return (
    <Form.Item className="c-button-wrapper">
      <button
        type={type}
        className={`${mainClassNames} ${className}`}
        disabled={disabled}
        onClick={handleClick}
        {...others}
      >
        {children}
      </button>
    </Form.Item>
  );
};

export default Button;
