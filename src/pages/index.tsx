// ./pages/index.tsx
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import ColorPicker from '../components/ColorPicker';

const CanvasWithNoSSR = dynamic(() => import('../components/Canvas'), {
  ssr: false,
});

export default function Home() {
  const [color, setColor] = useState('#000000');
  const [reset, setReset] = useState(false);
  const [drawings, setDrawings] = useState<string[]>([]);
  const [selectedDrawing, setSelectedDrawing] = useState('');

  useEffect(() => {
    const savedDrawings = typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('drawings') || '[]') : [];
    setDrawings(savedDrawings);
  }, []);

  const handleReset = () => {
    setReset(true);
  };

  const handleSave = () => {
    const canvas = document.getElementsByTagName('canvas')[0];
    const savedDrawing = canvas?.toDataURL() || '';
    const newDrawings = [...drawings, savedDrawing];
    setDrawings(newDrawings);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('drawings', JSON.stringify(newDrawings));
    }
  };

  const handleDrawingClick = (drawing: string) => {
    setSelectedDrawing(drawing);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold underline my-10">Draw App</h1>
      <div className="flex mb-10">
        <ColorPicker color={color} setColor={setColor} />
        <button className="p-2 bg-gray-700 rounded text-white mx-2" onClick={handleReset}>Reset</button>
        <button className="p-2 bg-gray-700 rounded text-white mx-2" onClick={handleSave}>Save</button>
      </div>
      <CanvasWithNoSSR color={color} reset={reset} setReset={setReset} selectedImage={selectedDrawing} />
      <div className="m-10 flex flex-wrap justify-center">
        {drawings.map((drawing, index) => (
          <img key={index} src={drawing} onClick={() => handleDrawingClick(drawing)} className="w-24 h-24 m-2 cursor-pointer border-2 border-white rounded" />
        ))}
      </div>
    </div>
  );
}
