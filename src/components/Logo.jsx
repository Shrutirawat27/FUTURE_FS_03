import React from 'react';

export const Logo = ({ className = "w-10 h-10" }) => {
  return (
    <div className="flex items-center gap-2">
      {/* Icon Container */}
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
      >
        {/* 1. The Wave */}
        <path 
          d="M50 90C72.0914 90 90 72.0914 90 50C90 45 88 40 85 36C80 45 70 48 60 42C50 36 40 38 30 45C24 49 20 50 15 48C11.5 56 10 65 10 50C10 72.0914 27.9086 90 50 90Z" 
          className="fill-lightHeading dark:fill-heading" 
        />
        
        {/* 2. The Ring */}
        <path 
          d="M82 28C75 19 63 12 50 12C29.0132 12 12 29.0132 12 50C12 70.9868 29.0132 88 50 88C70.9868 88 88 70.9868 88 50C88 45 87 40 85 36" 
          strokeWidth="10" 
          strokeLinecap="round"
          className="stroke-lightAccent dark:stroke-accent"
        />

        {/* 3. The Plane (FIXED) */}
        {/* Added 'paintOrder' style so the border doesn't eat the plane */}
        <path 
          d="M88 12L70 28L62 24L58 28L70 36L74 48L78 44L76 34L94 16L88 12Z" 
          strokeWidth="6" 
          style={{ paintOrder: 'stroke' }}
          className="fill-lightHeading dark:fill-accent stroke-lightBackground dark:stroke-background"
        />
      </svg>
      
      {/* Text Typography */}
      <span className="font-sans font-extrabold text-2xl tracking-tight text-lightHeading dark:text-heading">
        TRIP
        <span className="text-lightAccent dark:text-accent">KART</span>
      </span>
    </div>
  );
};