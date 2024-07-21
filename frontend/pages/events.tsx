import React, { useState, useMemo, useCallback, useEffect, memo } from 'react';
import { GetServerSideProps } from 'next';
import AddEventModal from '../components/AddEventModal';
import { CustomEvent } from '../types/CustomEvent';
import dynamic from 'next/dynamic';
import FilterForm from '../components/FilterForm';
import Button from '../components/global/button';

const EventList = dynamic(() => import('../components/EventList'), {
  loading: () => <p>Loading events...</p>,
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
  const [filterType, setFilterType] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');
  const [fetchError, setFetchError] = useState<string | null>(error || null);

  const fetchEvents = useCallback(async (url: string) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch events, status: ${response.status}`);
      }
      const data = await response.json();
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
    if (error) {
      setFetchError(error);
    } else {
      fetchEvents('http://localhost:8000/events/');
    }
  }, [error, fetchEvents]);

  useEffect(() => {
    if (!filterType || filterValue === '') {
      setFilteredEvents(allEvents);
      return;
    }

    let filtered = allEvents;

    if (filterType === 'type') {
      filtered = allEvents.filter((event) => event.type === filterValue);
    } else if (filterType === 'user') {
      filtered = allEvents.filter((event) => event.actor_id === Number(filterValue));
    } else if (filterType === 'repo') {
      filtered = allEvents.filter((event) => event.repo_id === Number(filterValue));
    }

    setFilteredEvents(filtered);
  }, [filterType, filterValue, allEvents]);

  const handleFilterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
    setFilterValue('');
    setFetchError(null);
  };

  const handleFilterValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilterValue(e.target.value);
    setFetchError(null);
  };

  const handleAddEvent = async (newEvent: Omit<CustomEvent, 'id'>) => {
    try {
      const response = await fetch('http://localhost:8000/events/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData.error || 'Failed to create event');
        return;
      }

      const createdEvent = await response.json();
      setAllEvents((prevEvents) => [...prevEvents, createdEvent]);
      setFilteredEvents((prevEvents) => [...prevEvents, createdEvent]);
    } catch (addEventError) {
      console.error('Error creating event:', addEventError);
    }
  };

  const filteredEventList = useMemo(() => <EventList events={filteredEvents} />, [filteredEvents]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      {fetchError && <p className="text-red-500">{fetchError}</p>}
      <Button title='Add Event' dataCy='add-event-button' onClick={() => setShowModal(true)} className='mb-4 bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800' />
      {showModal && (
        <AddEventModal
          onClose={() => setShowModal(false)}
          onAddEvent={handleAddEvent}
        />
      )}
      <FilterForm
        filterType={filterType}
        filterValue={filterValue}
        onFilterTypeChange={handleFilterTypeChange}
        onFilterValueChange={handleFilterValueChange}
        error={fetchError}
      />
      {loading ? <p>Loading events...</p> : filteredEventList}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const res = await fetch('http://localhost:8000/events/');
    if (!res.ok) {
      throw new Error(`Failed to fetch events, received status ${res.status}`);
    }
    const initialEvents: CustomEvent[] = await res.json();

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
