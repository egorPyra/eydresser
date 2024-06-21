import React, { useState, useRef } from "react";
import Draggable from "react-draggable";

interface DraggableImageProps {
  src: string;
  alt: string;
  rotateAngle: number;
}

const DraggableImage: React.FC<DraggableImageProps> = ({ src, alt }) => {
  const [rotation, setRotation] = useState(0);
  const isDraggingRef = useRef(false);

  const handleDrag = () => {
    isDraggingRef.current = true;
  };

  const handleStop = () => {
    if (!isDraggingRef.current) {
      setRotation((prevRotation) => (prevRotation + 90) % 360);
    }
    isDraggingRef.current = false;
  };

  return (
    <Draggable onDrag={handleDrag} onStop={handleStop}>
      <div style={{ transform: `rotate(${rotation}deg)`, position: 'absolute' }}>
        <img src={src} alt={alt} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
        <button >🔘</button>
      </div>
    </Draggable>
  );
};

export default DraggableImage;
