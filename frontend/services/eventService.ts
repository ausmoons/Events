import { CustomEvent } from '../types/CustomEvent';

const API_URL = 'http://localhost:8000/events/';

export const fetchEvents = async (): Promise<CustomEvent[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`Failed to fetch events, status: ${response.status}`);
    }
    return await response.json();
};

export const addEvent = async (newEvent: Omit<CustomEvent, 'id'>): Promise<CustomEvent> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create event');
    }

    return await response.json();
};