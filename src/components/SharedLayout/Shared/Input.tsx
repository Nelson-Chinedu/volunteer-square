import React, { FunctionComponent, ReactNode } from 'react';
import { Form, Input} from 'antd';


type sizeType = 'small' | 'middle' | 'large';

type Props = {
  placeholder: string;
  label?: string;
  name?: string;
  className?: string;
  size: sizeType;
  prefix?: string | ReactNode;
  error?: string;
  type: string;
}

const InputForm: FunctionComponent<Props> = ({
  label,
  placeholder,
  name,
  className,
  size,
  prefix,
  type,
  error,
}) => {

  return (
    <div>
      <Form.Item label={label} name={name} className="c-inputForm">
        <Input size={size} type={type} placeholder={placeholder}  className={className} prefix={prefix} />
        <p>{error}</p>
      </Form.Item>
    </div>
  )
};


export default InputForm;
