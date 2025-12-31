import React, { useState } from 'react';
import { Container } from '../components/Container';
import { Heading } from '../components/Heading';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { Button } from '../components/Button';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <Container>
      <Heading level={1}>Contact Us</Heading>
      <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Textarea placeholder="Your message" value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button>Send Message</Button>
    </Container>
  );
};

export default Contact;
