import { Skeleton } from 'antd';
import React, { FunctionComponent } from 'react';

type Props = {
  active: boolean;
  shape: 'circle' | 'square';
  size: number | 'small' | 'large' | 'default';
  width: any;
  height: any;
};

const LazyLoad: FunctionComponent<Props> = ({
  active,
  shape,
  size,
  height,
  width,
}) => {
  return (
    <div className="mb-8 md:mb-0 c-LazyLoad">
      <Skeleton.Avatar
        style={{ width, height }}
        active={active}
        shape={shape}
        size={size}
      />
    </div>
  );
};

export default LazyLoad;
