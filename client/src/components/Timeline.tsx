import React from 'react';

interface TimelineItem {
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">{index + 1}</div>
          <div>
            <h4 className="font-semibold">{item.title}</h4>
            <p className="text-gray-600">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
