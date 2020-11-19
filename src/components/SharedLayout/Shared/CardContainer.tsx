import React, { FunctionComponent } from 'react';
// import { Col, Card } from 'antd';

type Props = {
  id: string;
  title?: string;
  date?: string;
  description?: string;
  children: React.ReactNode;
};

const CardContainer: FunctionComponent<Props> = ({ children}) => {
  // const { Meta } = Card;

  return (
    <div className="cursor-pointer hover:shadow-lg border border-gray-400 w-11/12 m-auto mb-8 md:mb-0 hover:translate-y-px transform">
      {/* <img src="/images/dummy.jpeg" />
      <div className="w-10/12 m-auto py-6">
        {children}
      </div> */}
      {children}
    </div>
  );
};

export default CardContainer;
