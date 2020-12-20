import React, { FunctionComponent } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import { ClockCircleOutlined, EnvironmentOutlined, TagOutlined } from '@ant-design/icons';

import { GET_EVENT } from 'src/queries';

import LazyLoad from 'src/components/SharedLayout/Shared/LazyLoad';

import EventForm from 'src/components/MainLayout/HomePageView/EventForm';
import Footer from 'src/components/SharedLayout/Shared/Footer';

const Event: FunctionComponent<{}> = () => {
  const router = useRouter();
  const { data, loading } = useQuery(GET_EVENT, {
    variables: { id: router.query.event },
  });

  if (!data || loading) {
    return (
      <div className="container">
      <LazyLoad
        active={true}
        shape="square"
        size="large"
        width="100%"
        height="30px"
      />
      <LazyLoad
        active={true}
        shape="square"
        size="large"
        width="100%"
        height="30px"
      />
      </div>
    );
  }

  const {
    getEvent: { name, location, category, date, time, description },
  } = data.public;
console.log(description)
function createMarkup() {
  return {__html: description}
}
  return (
    <div>
      <div className="bg-white border-b border-gray-400 md:p-4">
        <div
          className="container mx-auto flex flex-col md:flex-row items-start md:items-center justify-between c-Events-container"
        >
          <p className="md:font-bold md:text-3xl font-semibold text-2xl">{name}</p>
          <div>
            <p className="items-center flex">
              <ClockCircleOutlined className="mr-2" />{`${date} ${time}`}
            </p>
            <p className="items-center flex">
              <EnvironmentOutlined className="mr-2"/>{location}
            </p>
            <p className="items-center flex pb-4 md:pb-0">
              <TagOutlined className="mr-2"/>{category}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto flex flex-col md:flex-row py-8 c-Events-container">
          <div className="md:mr-32 md:w-2/4">
            <img src="/images/dummy.jpeg" width="600" />
            <div className="md:mt-6 mt-6 mb-12 md:mb-0">
              <h2 className="text-lg font-semibold">Details</h2>
              <div dangerouslySetInnerHTML={{__html: description}}></div>
            </div>
          </div>
          <div>
            <div className="bg-white bg-auto align-center md:px-10 px-6 py-8 rounded-lg c-eventForm-container">
              <div>
                <EventForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Event;
