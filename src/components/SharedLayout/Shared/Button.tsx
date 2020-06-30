import React, { FunctionComponent, ReactNode } from 'react';

type Props = {
  primaryColor?: string;
  children: ReactNode;
  type: 'submit' | 'button';
  className?: string;
}

const Button: FunctionComponent<Props> = ({
  type,
  className,
  children
}) => {
  return (
    <button type={type} className={className}  >
      {children}
    </button>
  )
};

export default Button;