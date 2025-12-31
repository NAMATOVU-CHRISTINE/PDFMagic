import React, { ReactNode } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Container } from '../components/Container';

interface ToolLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({ children, title, description }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-12">
        <Container>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">{title}</h1>
            {description && <p className="text-gray-600 mt-2">{description}</p>}
          </div>
          {children}
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default ToolLayout;
