import React, { useEffect, useState, memo, useCallback, useMemo } from 'react';
import AddEventModal from '../components/AddEventModal';
import { CustomEvent } from '../types/CustomEvent';
import dynamic from 'next/dynamic';
import FilterForm from '../components/FilterForm';
import Button from '../components/global/button';

const EventList = dynamic(() => import('../components/EventList'), {
  loading: () => <p>Loading events...</p>,
});

const EventsPage: React.FC = () => {
  const [allEvents, setAllEvents] = useState<CustomEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<CustomEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async (url: string, isInitialFetch = false) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (isInitialFetch) {
        setAllEvents(data);
      }
      setFilteredEvents(data);
    } catch (fetchError) {
      console.error('Error fetching events:', fetchError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents('http://localhost:8000/events/', true);
  }, [fetchEvents]);

  useEffect(() => {
    if (!filterType || filterValue === '') {
      setFilteredEvents(allEvents);
      setError(null);
      return;
    }

    let url = '';
    if (filterType === 'user') {
      url = `http://localhost:8000/users/${filterValue}/events/`;
    } else if (filterType === 'repo') {
      url = `http://localhost:8000/repos/${filterValue}/events/`;
    } else if (filterType === 'type') {
      setFilteredEvents(allEvents.filter((event) => event.type === filterValue));
      return;
    }

    if (url) {
      fetchEvents(url);
    }
  }, [filterType, filterValue, allEvents, fetchEvents]);

  const handleFilterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
    setFilterValue('');
    setError(null);
  };

  const handleFilterValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
    setError(null);

    if (value === '') {
      setFilterValue('');
      setFilteredEvents(allEvents);
      return;
    }

    if ((filterType === 'user' || filterType === 'repo') && isNaN(Number(value))) {
      setError('Repo ID and User ID must be numbers.');
      setFilteredEvents(allEvents);
      return;
    }

    setFilterValue(value);
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
      <Button title='Add Event' dataCy='add-event-button' onClick={() => setShowModal(true)} className='mb-4 bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800'></Button>
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
        error={error}
      />
      {loading ? <p>Loading events...</p> : filteredEventList}
    </div>
  );
};

export default memo(EventsPage);
