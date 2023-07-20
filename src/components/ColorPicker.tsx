import { SketchPicker } from 'react-color';
import { useState } from 'react';

interface ColorPickerProps {
  color: string;
  setColor: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, setColor }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const handleClick = () => setDisplayColorPicker(!displayColorPicker);

  return (
    <div className="relative">
      <button 
        className="p-2 bg-gray-700 rounded text-white mx-2"
        onClick={handleClick}
      >
        Pick Color
      </button>
      {displayColorPicker ? (
        <div className="absolute z-10">
          <div 
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleClick}
          />
          <SketchPicker
            color={color}
            onChange={(updatedColor) => setColor(updatedColor.hex)}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;