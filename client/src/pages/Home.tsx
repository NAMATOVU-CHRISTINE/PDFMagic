import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { HowItWorks } from '../components/HowItWorks';
import { FAQ } from '../components/FAQ';

export const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <FAQ />
    </main>
  );
};

export default Home;
