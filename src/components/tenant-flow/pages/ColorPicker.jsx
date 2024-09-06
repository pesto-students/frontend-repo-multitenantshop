import React, { useEffect, useState } from "react";

const ColorPicker = ({ colorValue = ["#ff0000"], setColorValues }) => {
  const [colors, setColors] = useState(colorValue); // Initialize with one color input

  useEffect(() => {
    const newColors = [...colors];
    setColorValues(newColors); // Update color values array
  }, []);

  const handleColorChange = (index, event) => {
    const newColors = [...colors];
    newColors[index] = event.target.value;
    setColors(newColors);
    setColorValues(newColors); // Update color values array
  };

  const addColorInput = () => {
    setColors([...colors, "#ffffff"]); // Add new color input with default value
    setColorValues([...colors]);
  };

  const removeColorInput = (index) => {
    if (colors.length > 1) {
      const newColors = colors.filter((_, i) => i !== index);
      setColors(newColors);
      setColorValues(newColors); // Update color values array
    }
  };

  return (
    <div className="color-picker">
      <form>
        {colors.map((color, index) => (
          <div className="color-inputs" key={index}>
            <div className="color-input-container">
              <div className="input-color-container">
                <input
                  type="color"
                  className="input-color"
                  value={color}
                  onChange={(e) => handleColorChange(index, e)}
                />
              </div>

              {colors.length > 1 && (
                <button
                  type="button"
                  className="btn-remove-color"
                  onClick={() => removeColorInput(index)}
                  title="Remove color"
                >
                  X
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          title="Add color"
          type="button"
          className="btn-add-color"
          onClick={addColorInput}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default ColorPicker;
