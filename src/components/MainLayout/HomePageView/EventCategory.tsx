import React, { FunctionComponent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';

import GridContainer from 'src/components/SharedLayout/Shared/GridContainer';
import CardContainer from 'src/components/SharedLayout/Shared/CardContainer';
import LazyLoad from 'src/components/SharedLayout/Shared/LazyLoad';

import { GET_EVENTS } from 'src/queries';

type Props = {
  id?: string;
  headline: string;
  name?: string;
  title?: string;
  category?: string | string[];
  seeAll: boolean;
};

const EventCategory: FunctionComponent<Props> = ({
  headline,
  category,
  seeAll,
}) => {
  const [skip, setSkip] = useState(null);
  const [take, setTake] = useState(null);

  useEffect(() => {
    setSkip(0);
    setTake(4);
  }, []);

  const { data, loading } = useQuery(GET_EVENTS, {
    variables: {
      category,
      skip,
      take,
    },
  });

  if (!data || loading) {
    return (
      <>
        <h2 className="text-4xl ml-12 mb-4 c-Events-container">{headline}</h2>
        <div className="flex container mx-auto justify-around c-Events-container mb-8">
          <div className="flex justify-around items-center w-full">
            <LazyLoad
              active={true}
              shape="square"
              size="large"
              width={260}
              height={250}
            />
            <LazyLoad
              active={true}
              shape="square"
              size="large"
              width={260}
              height={250}
            />
            <LazyLoad
              active={true}
              shape="square"
              size="large"
              width={260}
              height={250}
            />
            <LazyLoad
              active={true}
              shape="square"
              size="large"
              width={260}
              height={250}
            />
          </div>
        </div>
      </>
    );
  }

  const {
    getAllEvents: { events },
  } = data.public;

  if (events.length <= 0) {
    return (
      <div className="mb-8">
        <h2 className="text-4xl ml-12 mb-4 c-Events-container">{headline}</h2>
        <h4 className="text-center">No event added</h4>
      </div>
    );
  }
  const route = category ? `/find/${category}` : `/find/Events`;

  return (
    <div className="container mx-auto c-Events-container">
      <div className="container mx-auto flex items-center justify-between c-Events-container">
        <h2 className="text-4xl">{headline}</h2>
        {seeAll ? (
          <Link href="/find/[event]" as={route}>
            <a className="mr-8">See all</a>
          </Link>
        ) : (
          ''
        )}
      </div>
      <div className="box-border mt-4">
        {events.map((event: Props) => {
          const { id, name } = event;
          return (
            <GridContainer gutter={[8, 48]} key={id}>
              <div>
                <CardContainer title={name} id={id}>
                  <Link href="/event/[event]" as={`/event/${id}`}>
                    <a className="block bg-red-400 w-full py-2 mt-4 text-white hover:text-white hover:bg-red-500">
                      View Event
                    </a>
                  </Link>
                </CardContainer>
              </div>
            </GridContainer>
          );
        })}
      </div>
    </div>
  );
};

export default EventCategory;
