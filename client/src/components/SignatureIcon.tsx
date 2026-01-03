import React from 'react';

interface SignatureIconProps {
  size?: number;
}

export const SignatureIcon: React.FC<SignatureIconProps> = ({ size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 17c3.333-3.333 5-5 5-5s1.667 1.667 5 5 5 5 5 5" />
      <path d="M17 3l4 4-10 10H7v-4L17 3z" />
    </svg>
  );
};

export default SignatureIcon;
