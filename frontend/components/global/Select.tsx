import React, { ChangeEvent, memo } from 'react';

interface SelectProps {
  id: string;
  name?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options?: { value: string; label: string }[];
  className?: string;
  dataCy?: string;
  required?: boolean;
}

const Select: React.FC<SelectProps> = ({
  id,
  name,
  value,
  onChange,
  options = [],
  className,
  dataCy,
  required,
}) => {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={className}
      data-cy={dataCy}
      required={required}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default memo(Select);
