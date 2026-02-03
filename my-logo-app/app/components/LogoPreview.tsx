"use client";

import { FC } from 'react';
import Icon from './Icon';
import * as icons from 'lucide-react';

interface LogoPreviewProps {
  text: string;
  textColor: string;
  fontSize: number;
  fontFamily: string;
  iconName: keyof typeof icons | null;
  iconSize: number;
  iconColor: string;
  layout: string;
  spacing: number;
}

const LogoPreview: FC<LogoPreviewProps> = ({
  text,
  textColor,
  fontSize,
  fontFamily,
  iconName,
  iconSize,
  iconColor,
  layout,
  spacing,
}) => {
  const logoContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: layout === 'top' ? 'column' : 'row',
    gap: `${spacing}px`,
  };

  const textStyle: React.CSSProperties = {
    color: textColor,
    fontSize: `${fontSize}px`,
    fontFamily: fontFamily,
    margin: 0,
  };

  return (
    <div style={logoContainerStyle}>
      {iconName && <Icon name={iconName} size={iconSize} color={iconColor} />}
      <p style={textStyle}>{text}</p>
    </div>
  );
};

export default LogoPreview;
