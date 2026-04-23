import React from 'react';

const BrandLogo = ({ className = "w-10 h-10" }: { className?: string }) => {
  return (
    <div className={`${className} flex items-center justify-center overflow-hidden`}>
      <img 
        src="/logo.png" 
        alt="Yoga with Amit" 
        className="max-w-full max-h-full object-contain"
        onError={(e) => {
          // Subtle fallback if image fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          target.parentElement!.innerHTML = '<div class="w-8 h-8 rounded-full bg-brand-olive/20 animate-pulse"></div>';
        }}
      />
    </div>
  );
};

export default BrandLogo;
