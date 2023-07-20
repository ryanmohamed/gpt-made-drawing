// ./components/Canvas.tsx
import { useRef, useEffect, useState } from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';

interface CanvasProps {
  color: string;
  reset: boolean;
  setReset: (value: boolean) => void;
}

const Canvas: React.FC<CanvasProps> = ({ color, reset, setReset }) => {
  let previousPoint = { x: 0, y: 0 };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
    p5.background(255);
  };

  const draw = (p5: p5Types) => {
    if (reset) {
      p5.background(255);
      setReset(false); // Set the reset back to false after resetting the canvas
    }
    if (p5.mouseIsPressed) {
      p5.stroke(color);
      const weight = p5.dist(p5.mouseX, p5.mouseY, previousPoint.x, previousPoint.y);
      p5.strokeWeight(weight);
      p5.line(p5.mouseX, p5.mouseY, previousPoint.x, previousPoint.y);
    }
    previousPoint = { x: p5.mouseX, y: p5.mouseY };
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('savedDrawing', document.getElementsByTagName('canvas')[0]?.toDataURL() || '');
    }
  }, [color]);

  return <Sketch setup={setup} draw={draw} />;
};

export default Canvas;
