import React, { useState, useMemo, useCallback, useEffect, memo } from 'react';
import { GetServerSideProps } from 'next';
import ModalWrapper from '../components/global/ModalWrapper';
import AddEventForm from '../components/AddEventForm';
import { CustomEvent } from '../types/CustomEvent';
import dynamic from 'next/dynamic';
import Button from '../components/global/Button';
import { fetchEvents as fetchEventsService, addEvent as addEventService } from '../services/eventService';
import EventFilter from '../components/EventFilter';
import Loading from '../components/global/Loading';

const EventList = dynamic(() => import('../components/EventList'), {
  loading: () => <Loading />,
});

interface EventsPageProps {
  initialEvents: CustomEvent[];
  error?: string;
}

const EventsPage: React.FC<EventsPageProps> = ({ initialEvents, error }) => {
  const [allEvents, setAllEvents] = useState<CustomEvent[]>(initialEvents);
  const [filteredEvents, setFilteredEvents] = useState<CustomEvent[]>(initialEvents);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(error || null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchEventsService();
      setAllEvents(data);
      setFilteredEvents(data);
    } catch (fetchError) {
      console.error('Error fetching events:', fetchError);
      setFetchError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!error) {
      fetchEvents();
    }
  }, [error, fetchEvents]);

  const handleAddEvent = async (newEvent: Omit<CustomEvent, 'id'>) => {
    setLoading(true);
    try {
      const createdEvent = await addEventService(newEvent);
      setAllEvents((prevEvents) => [...prevEvents, createdEvent]);
      setFilteredEvents((prevEvents) => [...prevEvents, createdEvent]);
    } catch (addEventError) {
      console.error('Error creating event:', addEventError);
    } finally {
      setLoading(false);
    }
  };

  const filteredEventList = useMemo(() => <EventList events={filteredEvents} />, [filteredEvents]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      {fetchError && <p className="text-red-500">{fetchError}</p>}
      <Button title='Add Event' dataCy='add-event-button' onClick={() => setShowModal(true)} className='mb-4 bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800' />
      {showModal && (
        <ModalWrapper
          onClose={() => setShowModal(false)}
          title="Add New Event"
          childComponent={AddEventForm}
          childProps={{ onAddEvent: handleAddEvent }}
        />
      )}
      <EventFilter allEvents={allEvents} onFilterChange={setFilteredEvents} error={fetchError} />
      {loading ? <Loading /> : filteredEventList}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
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

export default memo(EventsPage);
