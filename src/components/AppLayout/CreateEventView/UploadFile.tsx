import React, { FunctionComponent } from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadFile: FunctionComponent<{}> = () => {
  return (
    <div className="mt-2">
      <Upload>
        <Button>
          <UploadOutlined /> Upload
        </Button>
      </Upload>
    </div>
  )
};

export default UploadFile;
