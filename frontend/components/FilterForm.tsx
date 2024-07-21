import React, { memo } from 'react';
import Input from './global/Input';
import EventSelector from './EventSelector';
import FilterTypeSelector from './FilterTypeSelector';
import Label from './global/Label';

interface FilterFormProps {
  filterType: string;
  filterValue: string;
  onFilterTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onFilterValueChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  error: string | null;
}

const FilterForm: React.FC<FilterFormProps> = ({
  filterType,
  filterValue,
  onFilterTypeChange,
  onFilterValueChange,
  error,
}) => {
  return (
    <div className="mb-4" data-cy="filter-form">
      <Label htmlFor="filterType" className="mb-2" labelText="Filter by:" />
      <FilterTypeSelector
        id="filterType"
        value={filterType}
        onChange={onFilterTypeChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
      />
      {filterType && (
        <div className="mb-4">
          <label htmlFor="filterValue" className="block text-gray-700 mb-2">
            {`Enter ${filterType === 'type' ? 'Event Type' : filterType === 'user' ? 'Actor ID' : 'Repo ID'}`}
          </label>
          {filterType === 'type' ? (
            <EventSelector
              dataCy="filter-value-select"
              id="filterValue"
              name="filterValue"
              value={filterValue}
              onChange={onFilterValueChange}
              className="px-3 py-2 border focus:outline-none focus:border-indigo-500"
            />
          ) : (
            <Input
              type="text"
              id="filterValue"
              onChange={onFilterValueChange}
              className="w-full px-3 py-2 border focus:outline-none focus:border-indigo-500"
              dataCy="filter-value-input"
              value={filterValue}
            />
          )}
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
      )}
    </div>
  );
};

export default memo(FilterForm);
