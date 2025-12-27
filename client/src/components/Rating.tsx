import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  max?: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
}

const Rating: React.FC<RatingProps> = ({ value, max = 5, onChange, readonly = false }) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => (
        <button
          key={i}
          onClick={() => !readonly && onChange?.(i + 1)}
          disabled={readonly}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer'}`}
        >
          <Star className={`h-5 w-5 ${i < value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
        </button>
      ))}
    </div>
  );
};

export default Rating;
