import React, { FunctionComponent } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import LazyLoad from 'src/components/SharedLayout/Shared/LazyLoad';

import { GET_EVENT } from 'src/queries';

const Event: FunctionComponent<{}> = () => {
  const router = useRouter();
  const { data, loading } = useQuery(GET_EVENT, {
    variables: { id: router.query.event },
  });

  if (!data || loading) {
    return (
      <LazyLoad
        active={true}
        shape="square"
        size="large"
        width={260}
        height={250}
      />
    );
  }

  const {
    getEvent: { name, category, location, date, time, description, id },
  } = data.public;

  return (
    <div>
      <h2>Event Page</h2>
      <p>{id}</p>
      <p>{name}</p>
      <p>{category}</p>
      <p>{location}</p>
      <p>{date}</p>
      <p>{time}</p>
      <p>{description}</p>
    </div>
  );
};

export default Event;
