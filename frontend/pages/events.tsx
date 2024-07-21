import React, { useState, useMemo, useCallback, useEffect, memo } from 'react';
import ModalWrapper from '../components/global/ModalWrapper';
import AddEventForm from '../components/AddEventForm';
import { CustomEvent } from '../types/CustomEvent';
import dynamic from 'next/dynamic';
import Button from '../components/global/Button';
import { fetchEvents, addEventService } from '../services/eventService';
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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchEventsData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchEvents();
      setAllEvents(data);
      setFilteredEvents(data);
    } catch (fetchEventsError) {
      console.error('Error fetching events:', fetchEventsError);
      setFetchError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!error) {
      fetchEventsData();
    }
  }, [error, fetchEventsData]);

  const handleAddEvent = async (newEvent: Omit<CustomEvent, 'id'>) => {
    setLoading(true);
    setSuccessMessage(null);
    try {
      const createdEvent = await addEventService(newEvent);
      setAllEvents((prevEvents) => [...prevEvents, createdEvent]);
      setFilteredEvents((prevEvents) => [...prevEvents, createdEvent]);
      setSuccessMessage('Event successfully added!');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 1000);
    } catch (addEventError) {
      console.error('Error creating event:', addEventError);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  const filteredEventList = useMemo(() => <EventList events={filteredEvents} />, [filteredEvents]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      {fetchError && <p className="text-red-500">{fetchError}</p>}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> {successMessage}</span>
        </div>
      )}
      <Button
        title="Add Event"
        dataCy="add-event-button"
        onClick={() => setShowModal(true)}
        className="mb-4 bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800"
      />
      {showModal && (
        <ModalWrapper
          onClose={() => setShowModal(false)}
          title="Add New Event"
          childComponent={AddEventForm}
          childProps={{ onAddEvent: handleAddEvent }}
        />
      )}
      <EventFilter
        allEvents={allEvents}
        onFilterChange={setFilteredEvents}
        error={fetchError}
      />
      {loading ? <Loading /> : filteredEventList}
    </div>
  );
};

export default memo(EventsPage);
