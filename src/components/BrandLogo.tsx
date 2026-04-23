import React from 'react';

const BrandLogo = ({ className = "w-10 h-10" }: { className?: string }) => {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <img 
        src="/logo.png" 
        alt="Yoga with Amit Logo" 
        className="w-full h-full object-contain"
        onError={(e) => {
          // Fallback if image is missing
          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=100';
          (e.target as HTMLImageElement).className = "w-full h-full object-cover rounded-full opacity-50";
        }}
      />
    </div>
  );
};

export default BrandLogo;
