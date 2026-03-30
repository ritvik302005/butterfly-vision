import React from 'react';

export default function BrandMark({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-10 h-10 bg-brand-olive rounded-xl flex items-center justify-center shadow-lg shadow-brand-olive/20">
        <svg
          viewBox="0 0 64 64"
          className="w-6 h-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M30 31C22 20 12 18 9 24C6 30 12 39 23 40C18 45 17 52 22 55C27 58 34 51 32 36"
            stroke="white"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M34 31C42 20 52 18 55 24C58 30 52 39 41 40C46 45 47 52 42 55C37 58 30 51 32 36"
            stroke="white"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M32 18V46"
            stroke="white"
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <path
            d="M29 14L25 9M35 14L39 9"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <span className="text-2xl font-serif font-bold tracking-tight">Butterfly Vision</span>
    </div>
  );
}
