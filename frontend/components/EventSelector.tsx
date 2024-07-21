import React, { ChangeEvent } from 'react';
import Select from './global/Select';

interface EventSelectorProps {
    id: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
    dataCy?: string;
}

const eventOptions = [
    { value: '', label: 'Select event type' },
    { value: 'PushEvent', label: 'PushEvent' },
    { value: 'ReleaseEvent', label: 'ReleaseEvent' },
    { value: 'WatchEvent', label: 'WatchEvent' },
];

const EventSelector: React.FC<EventSelectorProps> = ({ id, name, value, onChange, className, dataCy }) => {
    return (
        <Select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            options={eventOptions}
            className={className}
            dataCy={dataCy}
        />
    );
};

export default EventSelector;
