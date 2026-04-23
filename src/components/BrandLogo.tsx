import React from 'react';

const BrandLogo = ({ className = "w-10 h-10" }: { className?: string }) => {
  return (
    <div className={`${className} flex items-center justify-center`}>
      {/* 
        This is an elegant SVG placeholder reflecting your brand.
        When you have the physical logo.png at the root or in /public, 
        you can replace this with <img src="/logo.png" />
      */}
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full text-brand-olive fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M50 30c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zM50 55c-11 0-20 9-20 20h40c0-11-9-20-20-20z" />
        <path d="M30 50c-5 0-10 5-10 10s5 10 10 10h5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M70 50c5 0 10 5 10 10s-5 10-10 10h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default BrandLogo;
