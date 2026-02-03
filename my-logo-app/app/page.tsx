"use client";

import { useState, useRef } from 'react';
import IconPicker from './components/IconPicker';
import LogoPreview from './components/LogoPreview';
import * as icons from 'lucide-react';
import { toSvg, toPng } from 'html-to-image';
import { PngIcoConverter } from './lib/png2icojs.js';

// Helper to convert data URL to File object
const dataURLtoFile = (dataurl: string, filename: string) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export default function Home() {
  const [selectedIcon, setSelectedIcon] = useState<keyof typeof icons | null>('Activity');
  const [iconSize, setIconSize] = useState(128);
  const [iconColor, setIconColor] = useState('#FFFFFF');
  const [iconRotation, setIconRotation] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('#3B82F6');
  const [backgroundShape, setBackgroundShape] = useState<'circle' | 'square' | 'rounded'>('circle');
  const [backgroundPadding, setBackgroundPadding] = useState(50);
  const logoRef = useRef<HTMLDivElement>(null);

  const handleIconSelect = (iconName: keyof typeof icons) => {
    setSelectedIcon(iconName);
  };

  const handleDownloadSvg = () => {
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

  const handleDownloadPng = () => {
    if (logoRef.current) {
      toPng(logoRef.current, { canvasWidth: 512, canvasHeight: 512 })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'logo.png';
          link.href = dataUrl;
          link.click();
        });
    }
  };

  const handleDownloadIco = () => {
    if (logoRef.current) {
      toPng(logoRef.current, { canvasWidth: 32, canvasHeight: 32 })
        .then(async (dataUrl) => {
          const pngFile = dataURLtoFile(dataUrl, 'favicon.png');
          const converter = new PngIcoConverter();
          const icoBlob = await converter.convertToBlobAsync([{ png: pngFile }]);
          const link = document.createElement('a');
          link.download = 'favicon.ico';
          link.href = URL.createObjectURL(icoBlob);
          link.click();
          URL.revokeObjectURL(link.href);
        });
    }
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <h2>Logo Factory</h2>
        
        <div className="control-group">
          <label>Icon</label>
          <IconPicker selectedIcon={selectedIcon} onIconSelect={handleIconSelect} />
        </div>
        <div className="control-group">
          <label>Icon Size</label>
          <input type="range" min="16" max="256" value={iconSize} onChange={(e) => setIconSize(parseInt(e.target.value))} />
        </div>
        <div className="control-group">
          <label>Icon Rotation</label>
          <input type="range" min="0" max="360" value={iconRotation} onChange={(e) => setIconRotation(parseInt(e.target.value))} />
        </div>
        <div className="control-group">
          <label>Icon Color</label>
          <input type="color" value={iconColor} onChange={(e) => setIconColor(e.target.value)} />
        </div>

        <hr style={{borderColor: 'var(--border-color)', margin: '2rem 0'}} />

        <div className="control-group">
          <label>Background Padding</label>
          <input type="range" min="0" max="100" value={backgroundPadding} onChange={(e) => setBackgroundPadding(parseInt(e.target.value))} />
        </div>
        <div className="control-group">
          <label>Background Shape</label>
          <select value={backgroundShape} onChange={(e) => setBackgroundShape(e.target.value as any)}>
            <option value="circle">Circle</option>
            <option value="rounded">Rounded</option>
            <option value="square">Square</option>
          </select>
        </div>
        <div className="control-group">
          <label>Background Color</label>
          <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
        </div>
        
        <hr style={{borderColor: 'var(--border-color)', margin: '2rem 0'}} />

        <div className="control-group" style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <button onClick={handleDownloadPng}>Download PNG (512x512)</button>
          <button onClick={handleDownloadSvg}>Download SVG</button>
          <button onClick={handleDownloadIco}>Download Favicon (ICO)</button>
        </div>
      </aside>
      <main className="main-content">
        <div ref={logoRef} style={{ width: 256, height: 256, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LogoPreview
            iconName={selectedIcon}
            iconSize={iconSize}
            iconColor={iconColor}
            iconRotation={iconRotation}
            backgroundColor={backgroundColor}
            backgroundShape={backgroundShape}
            backgroundPadding={backgroundPadding}
          />
        </div>
      </main>
    </div>
  );
}
