import React, { FunctionComponent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';

import LazyLoad from 'src/components/SharedLayout/Shared/LazyLoad';

import { GET_EVENTS } from 'src/queries';

type Props = {
  id?: string;
  headline: string | string[];
  name?: string;
  title?: string;
  date?: string;
  time?: string;
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
        <h2 className="md:text-4xl text-xl md:ml-6 ml-4 my-4 text-green-500 c-Events-container">{headline}</h2>
        <div className="mb-8">
          <div className="md:flex md:justify-around md:items-center w-full">
            <LazyLoad active={true} shape="square" size="large" width={260} height={250} />
            <LazyLoad active={true} shape="square" size="large" width={260} height={250} />
            <LazyLoad active={true} shape="square" size="large" width={260} height={250} />
            <LazyLoad active={true} shape="square" size="large" width={260} height={250} />
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
    <div className="container mx-auto c-Events-container md:mb-10 mb-0">
      <div className="flex items-center justify-between mt-8 md:mt-0 ">
        <h2 className="md:text-4xl text-xl text-green-500 ml-2">{headline}</h2>
        {seeAll ? (
          <Link href="/find/[event]" as={route}>
            <a className="mr-3">See all</a>
          </Link>
        ) : (
          ''
        )}
      </div>
      <div className="box-border mt-4 flex flex-col md:flex-row">
        {events.map((event: Props) => {
          const { id, name, date, time } = event;
          return (
            <div key={id}>
              <div
                className="cursor-pointer hover:shadow-lg border border-gray-400 w-11/12 m-auto mb-8 md:mb-0 hover:translate-y-px transform"
              >
                <img src="/images/dummy.jpeg" />
                <div className="w-10/12 m-auto py-4">
                  <p className="font-semibold mb-4">{date} {time}</p>
                  <p className="capitalize">{name}</p>
                  <Link href="/event/[event]" as={`/event/${id}`}>
                    <a
                      className="block bg-red-400 w-full py-2 mt-4 text-center text-white hover:text-white hover:bg-red-500"
                    >
                      View Event
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventCategory;
