import React from 'react';
import { iconConfig } from './iconConfig';

type IconProps = {
  iconName: keyof typeof iconConfig;
  size?: number;
  className?: string;
};

const Icon: React.FC<IconProps> = ({ iconName, size = 24, className }) => {
  const icon = iconConfig[iconName];

  if (!icon) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox={icon.viewBox || '0 0 24 24'}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {icon.paths.map((path, index) => (
        <path
          key={index}
          d={path.d}
          fill={path.fill}
          stroke={path.stroke}
          strokeWidth={path.strokeWidth}
        />
      ))}
    </svg>
  );
};

export default Icon;