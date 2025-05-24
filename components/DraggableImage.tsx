import React, { useState, useRef, MouseEvent } from "react";
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
  const nodeRef = useRef(null); // Реф для элемента Draggable

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
  
  const preventDragStart = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault(); // Предотвращаем стандартное поведение браузера
  };

  return (
    <Draggable 
      nodeRef={nodeRef}
      position={{ x: positionX, y: positionY }} 
      onDrag={handleDrag} 
      onStop={handleStop}
    >
      <div ref={nodeRef} style={{ transform: `rotate(${rotation}deg)`, position: 'absolute' }}>
        <img 
          src={src} 
          alt={alt} 
          draggable="false"
          onDragStart={preventDragStart}
          onMouseDown={handleMouseDown}
          style={{ 
            width: '100px', 
            height: '100px', 
            objectFit: 'contain',
            cursor: 'move' // Добавляем курсор "move" для изображения
          }} 
        />
      </div>
    </Draggable>
  );
};

export default DraggableImage;
