import React, { useState, useEffect, ChangeEvent, memo } from 'react';
import { CustomEvent } from '../types/CustomEvent';
import FilterForm from './FilterForm';

interface EventFilterProps {
  allEvents: CustomEvent[];
  onFilterChange: (filteredEvents: CustomEvent[]) => void;
  error?: string | null;
}

const EventFilter: React.FC<EventFilterProps> = ({
  allEvents,
  onFilterChange,
  error = null,
}) => {
  const [filterType, setFilterType] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');

  useEffect(() => {
    if (!filterType || filterValue === '') {
      onFilterChange(allEvents);
      return;
    }

    let filtered = allEvents;

    if (filterType === 'type') {
      filtered = allEvents.filter((event) => event.type === filterValue);
    } else if (filterType === 'user') {
      filtered = allEvents.filter(
        (event) => event.actor_id === Number(filterValue),
      );
    } else if (filterType === 'repo') {
      filtered = allEvents.filter(
        (event) => event.repo_id === Number(filterValue),
      );
    }

    onFilterChange(filtered);
  }, [filterType, filterValue, allEvents, onFilterChange]);

  const handleFilterTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
    setFilterValue('');
  };

  const handleFilterValueChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
