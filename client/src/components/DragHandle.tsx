import React from 'react';
import { GripVertical } from 'lucide-react';

interface DragHandleProps {
  darkMode?: boolean;
}

const DragHandle: React.FC<DragHandleProps> = ({ darkMode = false }) => {
  return (
    <div
      className={`cursor-grab active:cursor-grabbing p-1 rounded ${
        darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
      }`}
      aria-label="Drag to reorder"
    >
      <GripVertical className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
    </div>
  );
};

export default DragHandle;
