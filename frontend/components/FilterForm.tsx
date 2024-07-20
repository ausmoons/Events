import React, { memo } from 'react';

interface FilterFormProps {
    filterType: string;
    filterValue: string;
    onFilterTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onFilterValueChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
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
            <label htmlFor="filterType" className="block text-gray-700 mb-2">
                Filter by:
            </label>
            <select
                data-cy="filter-type-select"
                id="filterType"
                value={filterType}
                onChange={onFilterTypeChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
            >
                <option value="">All</option>
                <option value="type">Event Type</option>
                <option value="user">User ID</option>
                <option value="repo">Repo ID</option>
            </select>
            {filterType && (
                <div className="mb-4">
                    <label htmlFor="filterValue" className="block text-gray-700 mb-2">
                        {`Enter ${filterType === 'type' ? 'Event Type' : filterType === 'user' ? 'User ID' : 'Repo ID'}`}
                    </label>
                    {filterType === 'type' ? (
                        <select
                            data-cy="filter-value-select"
                            id="filterValue"
                            value={filterValue}
                            onChange={onFilterValueChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
                        >
                            <option value="">Select event type</option>
                            <option value="PushEvent">PushEvent</option>
                            <option value="ReleaseEvent">ReleaseEvent</option>
                            <option value="WatchEvent">WatchEvent</option>
                        </select>
                    ) : (
                        <input
                            data-cy="filter-value-input"
                            type="text"
                            id="filterValue"
                            value={filterValue}
                            onChange={onFilterValueChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
                        />
                    )}
                    {error && <div className="text-red-500 mt-2">{error}</div>}
                </div>
            )}
        </div>
    );
};

export default memo(FilterForm);
