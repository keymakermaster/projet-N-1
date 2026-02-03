"use client";

import * as icons from 'lucide-react';
import { FC, useState } from 'react';

interface IconPickerProps {
  selectedIcon: keyof typeof icons | null;
  onIconSelect: (iconName: keyof typeof icons) => void;
}

const IconPicker: FC<IconPickerProps> = ({ selectedIcon, onIconSelect }) => {
  const [search, setSearch] = useState('');

  const filteredIcons = Object.keys(icons).filter(iconName =>
    iconName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="icon-picker-search">
        <input
          type="text"
          placeholder="Search icons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="icon-grid">
        {filteredIcons.map((iconName) => {
          const Icon = icons[iconName as keyof typeof icons];
          // @ts-ignore
          if (typeof Icon !== 'function' || !Icon.displayName) {
            return null;
          }

          return (
            <div
              key={iconName}
              className={`icon-item ${iconName === selectedIcon ? 'selected' : ''}`}
              onClick={() => onIconSelect(iconName as keyof typeof icons)}
            >
              <Icon />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IconPicker;
