import React from 'react';

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
          <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select {label.toLowerCase()}</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        )}
      </label>
    </div>
  );
};

export default FormField;
