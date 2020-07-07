import React, { FunctionComponent, ReactNode, useState, ChangeEvent } from 'react';
import { Input} from 'antd';


type sizeType = 'small' | 'middle' | 'large';

type defaultType = 'text' | 'email' | 'password' | 'search' | 'tel' | 'textarea';

type Props = {
  placeholder: string;
  label?: string;
  name: string;
  type: defaultType;
  className?: string;
  size: sizeType;
  prefix?: string | ReactNode;
  onBlur: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  value: string;
  error?: string;
}

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
}) => {
  const [description, setDescription] = useState('');
  const _handleChange = (e:any) => {
    setDescription(e.target.value);
  }
  if (type === 'textarea') {
    return (
      <div>
        <label htmlFor={label}>{label}</label>
        <textarea
          placeholder={placeholder}
          id={label}
          className={className}
          onChange={_handleChange}
          onBlur={onBlur}
          value={description}
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
  )
};


export default InputForm;
