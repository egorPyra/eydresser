import React, { useState, useRef } from "react";
import Draggable from "react-draggable";

interface DraggableImageProps {
  src: string;
  alt: string;
  positionX: number;
  positionY: number;
  onPositionChange: (positionX: number, positionY: number) => void;
}

const DraggableImage: React.FC<DraggableImageProps> = ({
  src,
  alt,
  positionX,
  positionY,
  onPositionChange,
}) => {
  const [rotation, setRotation] = useState(0);
  const isDraggingRef = useRef(false);

  const handleDrag = () => {
    isDraggingRef.current = true;
  };

  const handleStop = (e: any, data: any) => {
    // Update position based on the current position of the image
    onPositionChange(data.x, data.y);

    // Rotate the image if it was not dragged
    if (!isDraggingRef.current) {
      setRotation((prevRotation) => (prevRotation + 90) % 360);
    }
    
    isDraggingRef.current = false;
  };

  return (
    <Draggable 
      position={{ x: positionX, y: positionY }} 
      onDrag={handleDrag} 
      onStop={handleStop}
    >
      <div style={{ transform: `rotate(${rotation}deg)`, position: 'absolute' }}>
        <img src={src} alt={alt} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
        <button style={{ cursor: 'move' }}>🔘</button>
      </div>
    </Draggable>
  );
};

export default DraggableImage;
