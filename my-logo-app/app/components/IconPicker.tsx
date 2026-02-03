"use client";

import {
  Activity, Aperture, Airplay, AlarmClock, Album, Anchor, Archive, AtSign, Award, Book, Box, Briefcase, Camera, CheckCircle, Circle, Clipboard, Clock, Cloud, Code, Coffee, Cpu, Database, Disc, Edit, Eye, Feather, Flag, Folder, Github, Globe, Heart, Home, Image, Inbox, Layers, Layout, Link, Lock, MapPin, Maximize, Mic, Moon, Music, Package, PenTool, Power, Save, Search, Send, Settings, Shield, ShoppingCart, Sidebar, Star, Sun, Tablet, Tag, Target, Thermometer, ThumbsUp, Trash2, TrendingUp, Truck, User, Video, Watch, Wifi, Wind, Zap
} from 'lucide-react';
import { FC, useState } from 'react';

const icons = {
  Activity, Aperture, Airplay, AlarmClock, Album, Anchor, Archive, AtSign, Award, Book, Box, Briefcase, Camera, CheckCircle, Circle, Clipboard, Clock, Cloud, Code, Coffee, Cpu, Database, Disc, Edit, Eye, Feather, Flag, Folder, Github, Globe, Heart, Home, Image, Inbox, Layers, Layout, Link, Lock, MapPin, Maximize, Mic, Moon, Music, Package, PenTool, Power, Save, Search, Send, Settings, Shield, ShoppingCart, Sidebar, Star, Sun, Tablet, Tag, Target, Thermometer, ThumbsUp, Trash2, TrendingUp, Truck, User, Video, Watch, Wifi, Wind, Zap
};

interface IconPickerProps {
  onIconSelect: (iconName: keyof typeof icons) => void;
}

const IconPicker: FC<IconPickerProps> = ({ onIconSelect }) => {
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
          return (
            <div
              key={iconName}
              className="icon-item"
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
