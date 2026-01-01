import React, { useState, useEffect } from 'react';
import { Button } from './Button';

export const CookieBanner: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted');
    if (!accepted) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex justify-between items-center">
      <p>We use cookies to improve your experience.</p>
      <Button onClick={accept}>Accept</Button>
    </div>
  );
};

export default CookieBanner;
