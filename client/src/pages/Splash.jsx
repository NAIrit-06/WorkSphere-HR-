import React from 'react';

export default function Splash() {
  return (
    <div className="h-screen w-screen bg-brand-lightBg flex flex-col items-center justify-center animate-fade-in">
      <div className="relative flex items-center justify-center mb-6">
        <div className="absolute w-36 h-36 border-4 border-dashed border-brand-teal rounded-full animate-spin"></div>
        <div className="w-28 h-28 bg-brand-navy rounded-full flex items-center justify-center shadow-2xl z-10">
          <span className="text-4xl font-extrabold text-brand-teal">W</span>
        </div>
      </div>
      <h1 className="text-4xl font-extrabold text-brand-navy tracking-widest mb-2">WorkSphere</h1>
      <p className="text-sm text-gray-500 tracking-medium font-medium animate-pulse">Every workday, perfectly aligned. [cite: 191]</p>
    </div>
  );
}