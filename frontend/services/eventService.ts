import { CustomEvent } from '../types/CustomEvent';

const backendUrl = 'http://localhost:8000';
const API_URL = `${backendUrl}/events/`;

export const fetchEvents = async (): Promise<CustomEvent[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch events, status: ${response.status}`);
  }
  return response.json();
};

export const addEventService = async (
  newEvent: Omit<CustomEvent, 'id'>
): Promise<CustomEvent> => {
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

  return response.json();
};

export const fetchFilteredEvents = async (type: string, value: string): Promise<CustomEvent[]> => {
  try {
    let url = `${backendUrl}/events/`;
    if (type && value) {
      if (type === 'user') {
        url = `${backendUrl}/users/${value}/events/`;
      } else if (type === 'repo') {
        url = `${backendUrl}/repos/${value}/events/`;
      } else {
        url += `?${type}=${value}`;
      }
    }
    const response = await fetch(url);
    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (contentType && contentType.indexOf("application/json") !== -1) {
      return await response.json();
    } else {
      const text = await response.text();
      console.error('Unexpected response format:', text);
      throw new Error('Unexpected response format');
    }
  } catch (error) {
    console.error('Error fetching filtered events:', error);
    throw error;
  }
};
