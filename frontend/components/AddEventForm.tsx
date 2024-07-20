import React, { useState, memo } from 'react';
import { users, repositories } from '../data/hardcodedData';
import { CustomEvent } from '../types/CustomEvent';
import Button from './global/button';

interface AddEventFormProps {
  onClose: () => void;
  onAddEvent: (event: Omit<CustomEvent, 'id'>) => void;
}

const AddEventForm: React.FC<AddEventFormProps> = ({ onClose, onAddEvent }) => {
  const [newEvent, setNewEvent] = useState<Omit<CustomEvent, 'id'>>({
    type: '',
    public: false,
    repo_id: 0,
    actor_id: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      setNewEvent({
        ...newEvent,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setNewEvent({
        ...newEvent,
        [name]:
          name === 'repo_id' || name === 'actor_id' ? Number(value) : value,
      });
    }

    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!newEvent.type) {
      setError('Please select an event type.');
      return;
    }

    const isRepoValid = repositories.some(
      (repo) => repo.id === newEvent.repo_id,
    );
    const isActorValid = users.some((user) => user.id === newEvent.actor_id);

    if (!isRepoValid) {
      setError('Invalid repository ID.');
      return;
    }

    if (!isActorValid) {
      setError('Invalid actor ID.');
      return;
    }

    onAddEvent(newEvent);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-4">
        <label className="block text-gray-700">
          Type:
          <select
            name="type"
            value={newEvent.type}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            data-cy="type-select"
          >
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
            data-cy="public-checkbox"
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
            data-cy="repo-id-input"
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
            data-cy="actor-id-input"
          />
        </label>
      </div>
      {error && (
        <div className="text-red-500 mb-4" data-cy="error-message">
          {error}
        </div>
      )}
      <div className="flex justify-end">
        <Button title='Add Event' onClick={() => handleSubmit} dataCy='submit-button' className='mb-4 bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800'></Button>
        <Button title='Close' onClick={onClose} className='mb-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600'></Button>
      </div>
    </form>
  );
};

export default memo(AddEventForm);
