"use client";

import { useState, useRef } from 'react';
import IconPicker from './components/IconPicker';
import LogoPreview from './components/LogoPreview';
import * as icons from 'lucide-react';
import { toSvg } from 'html-to-image';

export default function Home() {
  const [selectedIcon, setSelectedIcon] = useState<keyof typeof icons | null>('Activity');
  const [text, setText] = useState('Logo');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [fontSize, setFontSize] = useState(48);
  const [fontFamily, setFontFamily] = useState('Roboto');
  const [iconSize, setIconSize] = useState(64);
  const [iconColor, setIconColor] = useState('#FFFFFF');
  const [layout, setLayout] = useState('top');
  const [spacing, setSpacing] = useState(20);
  const logoRef = useRef<HTMLDivElement>(null);

  const handleIconSelect = (iconName: keyof typeof icons) => {
    setSelectedIcon(iconName);
  };

  const handleDownload = () => {
    if (logoRef.current) {
      toSvg(logoRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'logo.svg';
          link.href = dataUrl;
          link.click();
        });
    }
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <h2>Logo Factory</h2>
        <div className="control-group">
          <button onClick={handleDownload}>Download SVG</button>
        </div>
        <div className="control-group">
          <label>Text</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div className="control-group">
          <label>Text Color</label>
          <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
        </div>
        <div className="control-group">
          <label>Font Size</label>
          <input type="range" min="12" max="128" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} />
        </div>
        <div className="control-group">
          <label>Font Family</label>
          <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
            <option value="Roboto">Roboto</option>
            <option value="Lato">Lato</option>
            <option value="Montserrat">Montserrat</option>
          </select>
        </div>
        <div className="control-group">
          <label>Icon Size</label>
          <input type="range" min="16" max="256" value={iconSize} onChange={(e) => setIconSize(parseInt(e.target.value))} />
        </div>
        <div className="control-group">
          <label>Icon Color</label>
          <input type="color" value={iconColor} onChange={(e) => setIconColor(e.target.value)} />
        </div>
        <div className="control-group">
          <label>Layout</label>
          <select value={layout} onChange={(e) => setLayout(e.target.value)}>
            <option value="top">Icon on Top</option>
            <option value="left">Icon on Left</option>
          </select>
        </div>
        <div className="control-group">
          <label>Spacing</label>
          <input type="range" min="0" max="100" value={spacing} onChange={(e) => setSpacing(parseInt(e.target.value))} />
        </div>
        <div className="control-group">
          <label>Icon</label>
          <IconPicker onIconSelect={handleIconSelect} />
        </div>
      </aside>
      <main className="main-content">
        <div ref={logoRef}>
          <LogoPreview
            text={text}
            textColor={textColor}
            fontSize={fontSize}
            fontFamily={fontFamily}
            iconName={selectedIcon}
            iconSize={iconSize}
            iconColor={iconColor}
            layout={layout}
            spacing={spacing}
          />
        </div>
      </main>
    </div>
  );
}
