import React from 'react';
import { Button } from './Button';

interface PricingCardProps {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({ name, price, features, popular }) => {
  return (
    <div className={`p-6 rounded-lg ${popular ? 'bg-blue-500 text-white' : 'bg-white'} shadow-lg`}>
      {popular && <div className="text-sm font-semibold mb-2">Most Popular</div>}
      <h3 className="text-xl font-bold">{name}</h3>
      <div className="text-3xl font-bold my-4">{price}</div>
      <ul className="space-y-2 mb-6">
        {features.map((f, i) => <li key={i}>✓ {f}</li>)}
      </ul>
      <Button variant={popular ? 'secondary' : 'primary'}>Get Started</Button>
    </div>
  );
};

export default PricingCard;
