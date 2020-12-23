import React, {FunctionComponent} from 'react';

type Props = {
  path: string;
  classname: string;
};

const Icon: FunctionComponent<Props> = ({path, classname}) => {
  return (
    <img src={path} className={classname} />
  )
};

export default Icon;