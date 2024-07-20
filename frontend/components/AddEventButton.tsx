import React, { memo } from 'react';

interface AddEventButtonProps {
    onClick: () => void;
}

const AddEventButton: React.FC<AddEventButtonProps> = ({ onClick }) => {
    return (
        <button
            data-cy="add-event-button"
            className="mb-4 bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800"
            onClick={onClick}
        >
            Add Event
        </button>
    );
};

export default memo(AddEventButton);
