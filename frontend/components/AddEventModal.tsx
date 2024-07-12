import React, { useState } from 'react';

interface AddEventModalProps {
  onClose: () => void;
  onAddEvent: (event: Omit<Event, 'id'>) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ onClose, onAddEvent }) => {
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({
    type: '',
    public: false,
    repo_id: 0,
    actor_id: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: name === 'public' ? e.target.checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    onAddEvent(newEvent);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-xl mb-4">Add New Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">
              Type:
              <select name="type" value={newEvent.type} onChange={handleInputChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option value="">Select event type</option>
                <option value="PushEvent">PushEvent</option>
                <option value="ReleaseEvent">ReleaseEvent</option>
                <option value="WatchEvent">WatchEvent</option>
              </select>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Public:
              <input
                type="checkbox"
                name="public"
                checked={newEvent.public}
                onChange={handleInputChange}
                className="ml-2"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Repo ID:
              <input
                type="number"
                name="repo_id"
                value={newEvent.repo_id}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Actor ID:
              <input
                type="number"
                name="actor_id"
                value={newEvent.actor_id}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Add Event</button>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
