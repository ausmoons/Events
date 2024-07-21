import React, { ReactNode } from 'react';

interface LabelProps {
    labelText: string;
    htmlFor: string;
    children?: ReactNode;
    className?: string;
}

const Label: React.FC<LabelProps> = ({ labelText, htmlFor, children, className }) => {
    return (
        <label htmlFor={htmlFor} className={`block text-gray-700 mb-4 ${className}`}>
            {labelText}
            {children}
        </label>
    );
};

export default Label;
