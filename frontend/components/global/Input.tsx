import React, { ChangeEvent, memo } from 'react';

interface InputProps {
    type: string;
    id?: string;
    name?: string;
    value?: string | number;
    checked?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    dataCy?: string;
    required?: boolean;
}

const Input: React.FC<InputProps> = ({ type, id, name, value, checked, onChange, className, dataCy, required = true }) => {
    return (
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            className={className}
            data-cy={dataCy}
            required={required}
        />
    );
};

export default memo(Input);
