import React, { FunctionComponent, ReactNode, useState } from 'react';
import { Form, Input} from 'antd';


type sizeType = 'small' | 'middle' | 'large';

type defaultType = 'text' | 'email' | 'password' | 'search' | 'tel' | 'textarea';

type Props = {
  placeholder: string;
  label?: string;
  name?: string;
  type: defaultType;
  className?: string;
  size: sizeType;
  prefix?: string | ReactNode;
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
  error,
}) => {
  const [description, setDescription] = useState('');
  const _handleChange = (e:any) => {
    setDescription(e.target.value);
  }
  if (type === 'textarea') {
    return (
      <div>
      <Form.Item label={label} name={name} className="c-textareaForm">
        <textarea  placeholder={placeholder}  className={className} onChange={_handleChange} value={description} />
        <p>{error}</p>
      </Form.Item>
    </div>
    )
  }
  return (
    <div>
      <Form.Item label={label} name={name} className="c-inputForm mb-6" htmlFor={label}>
        <Input size={size} type={type} placeholder={placeholder} id={label} className={className} prefix={prefix} />
        <p>{error}</p>
      </Form.Item>
    </div>
  )
};


export default InputForm;
