import React, { memo } from 'react';
import AddEventForm from './AddEventForm';
import { CustomEvent } from '../types/CustomEvent';
import Button from './global/button';

interface AddEventModalProps {
  onClose: () => void;
  onAddEvent: (event: Omit<CustomEvent, 'id'>) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ onClose, onAddEvent }) => {
  return (
    <div
      data-cy="add-event-modal"
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
        <Button title='&times;' onClick={onClose} dataCy='close-button' className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'></Button>
        <h2 className="text-xl mb-4">Add New Event</h2>
        <AddEventForm onClose={onClose} onAddEvent={onAddEvent} />
      </div>
    </div>
  );
};

export default memo(AddEventModal);
