"use client";

import * as icons from 'lucide-react';
import { FC } from 'react';

interface IconProps {
  name: keyof typeof icons;
  [key: string]: any;
}

const Icon: FC<IconProps> = ({ name, ...props }) => {
  const LucideIcon = icons[name] as FC<any>;

  if (!LucideIcon) {
    return null;
  }

  return <LucideIcon {...props} />;
};

export default Icon;
