import { useState, useEffect, useCallback } from 'react';
import { CustomEvent } from '../types/CustomEvent';

export const useFetchEvents = (initialUrl: string) => {
  const [allEvents, setAllEvents] = useState<CustomEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async (url: string) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setAllEvents(data);
    } catch (fetchError) {
      console.error('Error fetching events:', fetchError);
      setError('Error fetching events');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents(initialUrl);
  }, [fetchEvents, initialUrl]);

  return { allEvents, loading, error, fetchEvents };
};

export const useFilteredEvents = (
  allEvents: CustomEvent[],
  filterType: string,
  filterValue: string,
) => {
  const [filteredEvents, setFilteredEvents] = useState<CustomEvent[]>([]);

  useEffect(() => {
    if (!filterType || filterValue === '') {
      setFilteredEvents(allEvents);
      return;
    }

    if (filterType === 'type') {
      setFilteredEvents(
        allEvents.filter((event) => event.type === filterValue),
      );
    }
  }, [allEvents, filterType, filterValue]);

  return filteredEvents;
};
