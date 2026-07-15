import React from 'react';

export default function Logo({ className = "w-10 h-10", showText = false, textClassName = "text-xl font-bold tracking-wider text-brandNavy" }) {
  return (
    <div className="flex items-center space-x-3 select-none">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 100 100" 
        className={className}
      >
        {/* Outer complex interwoven lines */}
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-brandNavy" />
        
        {/* Nested orbital lines */}
        <path 
          d="M 50 5 A 45 45 0 0 1 95 50 A 45 45 0 0 1 50 95 A 45 45 0 0 1 5 50 A 45 45 0 0 1 50 5 Z" 
          fill="none" 
          stroke="#00A896" 
          strokeDasharray="8 4" 
          strokeWidth="1.5" 
        />
        <path 
          d="M 18.2 18.2 A 45 45 0 0 1 81.8 18.2 A 45 45 0 0 1 81.8 81.8 A 45 45 0 0 1 18.2 81.8 Z" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1" 
          opacity="0.4"
          className="text-brandNavy"
        />
        
        {/* Intersecting central loops */}
        <path 
          d="M 50 5 C 75 20, 80 80, 50 95 C 20 80, 25 20, 50 5 Z" 
          fill="none" 
          stroke="#00A896" 
          strokeWidth="2" 
        />
        <path 
          d="M 5 50 C 20 25, 80 20, 95 50 C 80 80, 20 75, 5 50 Z" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          className="text-brandNavy"
        />
        
        {/* Center elements: teal core sphere and 4 dots forming a diamond */}
        <circle cx="50" cy="50" r="14" fill="none" stroke="#00A896" strokeWidth="1.5" />
        <circle cx="50" cy="42" r="3" fill="#00A896" />
        <circle cx="50" cy="58" r="3" fill="#00A896" />
        <circle cx="42" cy="50" r="3" fill="#00A896" />
        <circle cx="58" cy="50" r="3" fill="#00A896" />
      </svg>
      {showText && (
        <span className={textClassName}>WorkSphere</span>
      )}
    </div>
  );
}
