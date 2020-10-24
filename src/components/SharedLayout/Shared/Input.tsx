import React, { FunctionComponent, ReactNode, ChangeEvent } from 'react';
import { Input } from 'antd';

type sizeType = 'small' | 'middle' | 'large';

type defaultType =
  | 'text'
  | 'email'
  | 'password'
  | 'search'
  | 'tel'
  | 'textarea';

type Props = {
  placeholder: string;
  label?: string;
  name: string;
  type: defaultType;
  className?: string;
  size: sizeType;
  prefix?: string | ReactNode;
  onBlur: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value: any;
  error?: string;
  autoSize?: object;
};

const InputForm: FunctionComponent<Props> = ({
  label,
  placeholder,
  name,
  className,
  size,
  type,
  prefix,
  onBlur,
  onChange,
  value,
  error,
  autoSize
}) => {
  if (type === 'textarea') {
    return (
      <div>
        <label htmlFor={label}>{label}</label>
        <Input.TextArea
          placeholder={placeholder}
          id={label}
          className={className}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          name={name}
          autoSize={autoSize}
        />
        <p className="text-red-400">{error}</p>
      </div>
    );
  }
  if (type === 'password') {
    return (
      <div className="mb-4">
      <label htmlFor={label}>{label} </label>
      <Input.Password
        size={size}
        name={name}
        placeholder={placeholder}
        id={label}
        className={className}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        prefix={prefix}
      />
      <p className="text-red-400">{error}</p>
    </div>
    )
  }
  return (
    <div className="mb-4">
      <label htmlFor={label}>{label} </label>
      <Input
        size={size}
        type={type}
        name={name}
        placeholder={placeholder}
        id={label}
        className={className}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        prefix={prefix}
      />
      <p className="text-red-400">{error}</p>
    </div>
  );
};

export default InputForm;
