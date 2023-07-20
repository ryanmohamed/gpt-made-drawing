// ./pages/index.tsx
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import ColorPicker from '../components/ColorPicker';

// Dynamically import the Canvas component with SSR disabled
const CanvasWithNoSSR = dynamic(() => import('../components/Canvas'), {
  ssr: false,
});

export default function Home() {
  const [color, setColor] = useState('#000000');
  const [reset, setReset] = useState(false);

  const handleReset = () => {
    setReset(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl mb-4">Draw App</h1>
      <ColorPicker color={color} setColor={setColor} />
      <button
        className="p-2 bg-gray-700 rounded text-white my-2"
        onClick={handleReset}
      >
        Reset
      </button>
      <CanvasWithNoSSR color={color} reset={reset} setReset={setReset} />
    </div>
  );
}
