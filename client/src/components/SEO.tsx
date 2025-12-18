import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'PDF Tools - Free Online PDF Editor',
  description = 'Free online PDF tools to merge, split, compress, and convert PDF files. No registration required, works on any device.',
  keywords = 'pdf tools, merge pdf, split pdf, compress pdf, pdf editor, free pdf tools, online pdf',
  image = '/og-image.png',
  url = 'https://pdfmagic.com'
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="NAMATOVU-CHRISTINE" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;