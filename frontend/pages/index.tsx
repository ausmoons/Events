import React, { memo } from 'react';
import Head from 'next/head';
import EventsPage from './events';
import { GetServerSideProps } from 'next';
import { fetchEvents as fetchEventsService } from '../services/eventService';
import { CustomEvent } from '../types/CustomEvent';

interface IndexPageProps {
  initialEvents: CustomEvent[];
  error?: string;
}

const IndexPage: React.FC<IndexPageProps> = ({ initialEvents, error }) => {
  return (
    <>
      <Head>
        <title>Events Page</title>
        <meta name="description" content="This is my events page." />
      </Head>
      <div className="container mx-auto p-4">
        <EventsPage initialEvents={initialEvents} error={error} />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const initialEvents = await fetchEventsService();
    return {
      props: {
        initialEvents,
      },
    };
  } catch (error) {
    console.error('Error fetching events:', error);

    let errorMessage = 'Failed to load events';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      props: {
        initialEvents: [],
        error: errorMessage,
      },
    };
  }
};

export default memo(IndexPage);
