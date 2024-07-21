import React, { memo } from 'react';
import { CustomEvent } from '../types/CustomEvent';
import Details from './global/Detail';

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
                    <Details label="Type" value={event.type} />
                    <Details label="Public" value={event.public} />
                    <Details label="Repo ID" value={event.repo_id} />
                    <Details label="Actor ID" value={event.actor_id} />
                </li>
            ))}
        </ul>
    );
};

export default memo(EventList);
