import React, { useEffect, useState } from 'react';
import AddEventModal from '../components/AddEventModal';

interface Event {
  id: number;
  type: string;
  public: boolean;
  repo_id: number;
  actor_id: number;
}

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8000/events/');
        const data = await response.json();
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleAddEvent = async (newEvent: Omit<Event, 'id'>) => {
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
      setEvents([...events, createdEvent]);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-700">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <button className="mb-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={() => setShowModal(true)}>Add Event</button>
      {showModal && (
        <AddEventModal
          onClose={() => setShowModal(false)}
          onAddEvent={handleAddEvent}
        />
      )}
      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event.id} className="p-4 bg-white rounded-md shadow-md">
            <div><strong>Type:</strong> {event.type}</div>
            <div><strong>Public:</strong> {event.public ? 'Yes' : 'No'}</div>
            <div><strong>Repo ID:</strong> {event.repo_id}</div>
            <div><strong>Actor ID:</strong> {event.actor_id}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsPage;
