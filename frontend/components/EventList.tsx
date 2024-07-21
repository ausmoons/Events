import React, { memo } from 'react';
import { CustomEvent } from '../types/CustomEvent';

interface EventListProps {
    events?: CustomEvent[];
}

const EventList: React.FC<EventListProps> = ({ events = [] }) => {
    if (events.length === 0) {
        return (
            <div className="text-center text-gray-700">
                No events found for the selected filter.
            </div>
        );
    }

    return (
        <ul className="space-y-4">
            {events.map((event) => (
                <li key={event.id} data-cy="event-item" className="p-4 bg-white rounded-md shadow-md">
                    <div>
                        <strong>Type:</strong> {event.type}
                    </div>
                    <div>
                        <strong>Public:</strong> {event.public ? 'Yes' : 'No'}
                    </div>
                    <div>
                        <strong>Repo ID:</strong> {event.repo_id}
                    </div>
                    <div>
                        <strong>Actor ID:</strong> {event.actor_id}
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default memo(EventList);
