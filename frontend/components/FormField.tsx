import React, { memo } from 'react';
import Input from './global/Input';
import Select from './global/Select';

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  options?: { value: string; label: string }[];
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  options,
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">
        {label}:
        {type === 'select' ? (
          <Select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            options={options}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required={required}
          />
        ) : (
          <Input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="mt-1 block w-full focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        )}
      </label>
    </div>
  );
};

export default memo(FormField);
