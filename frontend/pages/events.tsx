import React, { useEffect, useState, memo } from 'react';
import AddEventModal from '../components/AddEventModal';
import { CustomEvent } from '../types/CustomEvent';
import dynamic from 'next/dynamic';

const EventList = dynamic(() => import('../components/EventList'), {
  loading: () => <p>Loading events...</p>,
});

const EventsPage = () => {
  const [allEvents, setAllEvents] = useState<CustomEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<CustomEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async (url: string, isInitialFetch = false) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (isInitialFetch) {
        setAllEvents(data);
      }
      setFilteredEvents(data);
      setLoading(false);
    } catch (fetchError) {
      setLoading(false);
      console.error('Error fetching events:', fetchError);
    }
  };

  useEffect(() => {
    fetchEvents('http://localhost:8000/events/', true);
  }, []);

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
      setFilteredEvents(
        allEvents.filter((event) => event.type === filterValue),
      );
      return;
    }

    if (url) {
      fetchEvents(url);
    }
  }, [filterType, filterValue, allEvents]);

  const handleFilterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
    setFilterValue('');
    setError(null);
  };

  const handleFilterValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const value = e.target.value;
    setError(null);

    if (value === '') {
      setFilterValue('');
      setFilteredEvents(allEvents);
      return;
    }

    if (
      (filterType === 'user' || filterType === 'repo') &&
      isNaN(Number(value))
    ) {
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
      setAllEvents([...allEvents, createdEvent]);
      setFilteredEvents([...allEvents, createdEvent]);
    } catch (addEventError) {
      console.error('Error creating event:', addEventError);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-700">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <button
        data-cy="add-event-button"
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        onClick={() => setShowModal(true)}
      >
        Add Event
      </button>
      {showModal && (
        <AddEventModal
          onClose={() => setShowModal(false)}
          onAddEvent={handleAddEvent}
        />
      )}
      <div className="mb-4">
        <label htmlFor="filterType" className="block text-gray-700 mb-2">
          Filter by:
        </label>
        <select
          data-cy="filter-type-select"
          id="filterType"
          value={filterType}
          onChange={handleFilterTypeChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
        >
          <option value="">All</option>
          <option value="type">Event Type</option>
          <option value="user">User ID</option>
          <option value="repo">Repo ID</option>
        </select>
      </div>
      {filterType && (
        <div className="mb-4">
          <label htmlFor="filterValue" className="block text-gray-700 mb-2">
            {`Enter ${filterType === 'type' ? 'Event Type' : filterType === 'user' ? 'User ID' : 'Repo ID'}`}
          </label>
          {filterType === 'type' ? (
            <select
              data-cy="filter-value-select"
              id="filterValue"
              value={filterValue}
              onChange={handleFilterValueChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select event type</option>
              <option value="PushEvent">PushEvent</option>
              <option value="ReleaseEvent">ReleaseEvent</option>
              <option value="WatchEvent">WatchEvent</option>
            </select>
          ) : (
            <input
              data-cy="filter-value-input"
              type="text"
              id="filterValue"
              value={filterValue}
              onChange={handleFilterValueChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
            />
          )}
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
      )}
      {loading ? <p>Loading events...</p> : EventList && <EventList events={filteredEvents} />}
    </div>
  );
};

export default memo(EventsPage);
