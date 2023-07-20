// ./components/Canvas.tsx
import { useRef, useEffect, useState } from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';

interface CanvasProps {
  color: string;
  reset: boolean;
  setReset: (value: boolean) => void;
  selectedImage?: string; // Image data URL
}

const Canvas: React.FC<CanvasProps> = ({ color, reset, setReset, selectedImage }) => {
  let previousPoint = { x: 0, y: 0 };
  const [resetting, setResetting] = useState(false);
  const [image, setImage] = useState<p5Types.Image | null>(null);
  const p5Ref = useRef<p5Types | null>(null);

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
    p5.background(255);
    p5Ref.current = p5; // store p5 instance in a ref
  };

  const draw = (p5: p5Types) => {
    if (reset && !resetting) {
      p5.background(255);
      setReset(false);
      setResetting(true);
    }

    // Draw image on canvas if it exists
    if (image) {
      p5.image(image, 0, 0, 500, 500);
      setImage(null);
      setResetting(false);
    } else if (p5.mouseIsPressed) {
      p5.stroke(color);
      const weight = p5.dist(p5.mouseX, p5.mouseY, previousPoint.x, previousPoint.y);
      p5.strokeWeight(weight);
      p5.line(p5.mouseX, p5.mouseY, previousPoint.x, previousPoint.y);
      setResetting(false);
    }
    previousPoint = { x: p5.mouseX, y: p5.mouseY };
  };

  // useEffect to handle changes in selectedImage prop
  useEffect(() => {
    if (selectedImage && p5Ref.current) {
      setImage(p5Ref.current.loadImage(selectedImage));
    }
  }, [selectedImage]);

  return <Sketch setup={setup} draw={draw} />;
};

export default Canvas;
