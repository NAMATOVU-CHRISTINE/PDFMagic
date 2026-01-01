import React from 'react';

interface TestimonialProps {
  quote: string;
  author: string;
  role?: string;
}

export const Testimonial: React.FC<TestimonialProps> = ({ quote, author, role }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <p className="text-gray-600 italic mb-4">"{quote}"</p>
      <div className="font-semibold">{author}</div>
      {role && <div className="text-sm text-gray-500">{role}</div>}
    </div>
  );
};

export default Testimonial;
