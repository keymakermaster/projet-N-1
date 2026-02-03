"use client";

import { FC } from 'react';
import Icon from './Icon';
import * as icons from 'lucide-react';

interface LogoPreviewProps {
  iconName: keyof typeof icons | null;
  iconSize: number;
  iconColor: string;
  iconRotation: number;
  backgroundColor: string;
  backgroundShape: 'circle' | 'square' | 'rounded';
  backgroundPadding: number;
}

const LogoPreview: FC<LogoPreviewProps> = ({
  iconName,
  iconSize,
  iconColor,
  iconRotation,
  backgroundColor,
  backgroundShape,
  backgroundPadding,
}) => {
  const backgroundStyle: React.CSSProperties = {
    padding: `${backgroundPadding}px`,
    backgroundColor: backgroundColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: backgroundShape === 'circle' ? '50%' : backgroundShape === 'rounded' ? '24px' : '0',
  };

  const iconStyle: React.CSSProperties = {
    transform: `rotate(${iconRotation}deg)`,
  };

  return (
    <div style={backgroundStyle}>
      <div style={iconStyle}>
        {iconName && <Icon name={iconName} size={iconSize} color={iconColor} />}
      </div>
    </div>
  );
};

export default LogoPreview;
