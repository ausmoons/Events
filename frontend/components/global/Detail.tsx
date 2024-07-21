import React from 'react';

interface EventDetailProps {
    label: string;
    value: string | number | boolean;
}

const EventDetail: React.FC<EventDetailProps> = ({ label, value }) => {
    return (
        <div>
            <strong>{label}:</strong> {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
        </div>
    );
};

export default EventDetail;
