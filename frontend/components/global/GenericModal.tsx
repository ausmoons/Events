import React, { memo, ReactNode } from 'react';
import Button from './Button';

interface GenericModalProps {
    onClose: () => void;
    title: string;
    children: ReactNode;
    className?: string;
}

const GenericModal: React.FC<GenericModalProps> = ({ onClose, title, children, className }) => {
    return (
        <div
            data-cy="generic-modal"
            className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
        >
            <div className={`bg-white p-6 rounded-lg shadow-lg w-1/3 relative ${className}`}>
                <Button title='&times;' onClick={onClose} dataCy='close-button' className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'></Button>
                <h2 className="text-xl mb-4">{title}</h2>
                {children}
            </div>
        </div>
    );
};

export default memo(GenericModal);