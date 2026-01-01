import React from 'react';

interface SocialShareProps {
  url: string;
  title: string;
}

export const SocialShare: React.FC<SocialShareProps> = ({ url, title }) => {
  const share = (platform: string) => {
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/shareArticle?url=${url}&title=${title}`,
    };
    window.open(urls[platform], '_blank');
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => share('twitter')} className="p-2 bg-blue-400 text-white rounded">Twitter</button>
      <button onClick={() => share('facebook')} className="p-2 bg-blue-600 text-white rounded">Facebook</button>
      <button onClick={() => share('linkedin')} className="p-2 bg-blue-700 text-white rounded">LinkedIn</button>
    </div>
  );
};

export default SocialShare;
