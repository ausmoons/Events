import React, { ElementType, memo } from 'react';
import GenericModal from './GenericModal';

interface ModalWrapperProps {
  onClose: () => void;
  title: string;
  childComponent: ElementType;
  childProps?: Record<string, any>;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  onClose,
  title,
  childComponent: ChildComponent,
  childProps,
}) => {
  return (
    <GenericModal onClose={onClose} title={title}>
      <ChildComponent {...childProps} onClose={onClose} />
    </GenericModal>
  );
};

export default memo(ModalWrapper);
