import React, { useState, useEffect, ChangeEvent, memo } from 'react';
import { CustomEvent } from '../types/CustomEvent';
import FilterForm from './FilterForm';
import { fetchFilteredEvents } from '../services/eventService';

interface EventFilterProps {
  onFilterChange: (filteredEvents: CustomEvent[]) => void;
  error?: string | null;
}

const EventFilter: React.FC<EventFilterProps> = ({
  onFilterChange,
  error = null,
}) => {
  const [filterType, setFilterType] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFilteredEvents(filterType, filterValue);
        onFilterChange(data);
      } catch (error) {
        console.error('Error fetching filtered events:', error);
      }
    };
    fetchData();
  }, [filterType, filterValue, onFilterChange]);

  const handleFilterTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
    setFilterValue('');
  };

  const handleFilterValueChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilterValue(e.target.value);
  };

  return (
    <FilterForm
      filterType={filterType}
      filterValue={filterValue}
      onFilterTypeChange={handleFilterTypeChange}
      onFilterValueChange={handleFilterValueChange}
      error={error}
    />
  );
};

export default memo(EventFilter);
