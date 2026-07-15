import React from 'react';
import Logo from './Logo';

export default function Splash() {
  return (
    <div className="h-screen w-screen bg-brand-lightBg flex flex-col items-center justify-center animate-fade-in">
      <div className="relative flex items-center justify-center mb-6">
        {/* Animated orbits in background */}
        <div className="absolute w-36 h-36 border border-brand-teal/40 rounded-full animate-spin [animation-duration:12s]"></div>
        <div className="absolute w-44 h-44 border border-dashed border-brand-navy/20 rounded-full animate-spin [animation-duration:8s] [animation-direction:reverse]"></div>
        
        {/* Central Logo Sphere Container */}
        <div className="w-28 h-28 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-xl z-10 p-4 transition-transform hover:scale-105 duration-300">
          <Logo className="w-20 h-20" />
        </div>
      </div>
      
      <h1 className="text-4xl font-extrabold text-brand-navy tracking-widest mb-2 animate-slide-up">
        WorkSphere
      </h1>
      <p className="text-sm text-brand-slate tracking-wide font-medium animate-pulse-subtle">
        Every workday, perfectly aligned.
      </p>
    </div>
  );
}