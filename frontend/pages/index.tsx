import React, { memo } from 'react';
import Head from 'next/head';
import EventsPage from './events';

const IndexPage = () => {
  return (
    <>
      <Head>
        <title>Events Page</title>
        <meta name="description" content="This is my events page." />
      </Head>
      <div className="container mx-auto p-4">
        <EventsPage />
      </div>
    </>
  );
};

export default memo(IndexPage);
