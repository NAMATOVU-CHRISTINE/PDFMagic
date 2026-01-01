import React, { useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribe:', email);
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
      <Button type="submit">Subscribe</Button>
    </form>
  );
};

export default Newsletter;
