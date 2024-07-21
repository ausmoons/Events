import React, { ChangeEvent, memo } from 'react';
import Select from './global/Select';

interface FilterTypeSelectorProps {
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  className?: string;
  dataCy?: string;
}

const filterTypeOptions = [
  { value: '', label: 'All' },
  { value: 'type', label: 'Event Type' },
  { value: 'user', label: 'Actor ID' },
  { value: 'repo', label: 'Repo ID' },
];

const FilterTypeSelector: React.FC<FilterTypeSelectorProps> = ({
  id,
  value,
  onChange,
  name,
  className,
  dataCy = 'filter-type-select',
}) => {
  return (
    <Select
      id={id}
      value={value}
      onChange={onChange}
      options={filterTypeOptions}
      name={name}
      className={className}
      dataCy={dataCy}
    />
  );
};

export default memo(FilterTypeSelector);
