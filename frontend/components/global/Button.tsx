import React, { memo } from 'react';

interface GlobalButtonProps {
  title: string;
  onClick: () => void;
  className?: string;
  dataCy?: string;
}

const Button: React.FC<GlobalButtonProps> = ({
  title,
  onClick,
  className,
  dataCy,
}) => {
  return (
    <button className={`${className}`} onClick={onClick} data-cy={dataCy}>
      {title}
    </button>
  );
};

export default memo(Button);
