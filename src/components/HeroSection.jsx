import React from 'react';

export default function HeroSection({ onShopNow }) {
  return (
    <section className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-white select-none">
      {/* 1. Full-bleed Hero Campaign Photography */}
      <div className="absolute inset-0 w-full h-full">
        <picture className="w-full h-full block">
          <source
            media="(max-width: 950px)"
            srcSet="/images/hero/hero_mobile.jpg"
          />
          <img
            src="/images/hero/hero_main.jpg"
            alt="ASHISH Luxury Contemporary Streetwear"
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
      </div>

      {/* 2. Centered "Shop now" Text Link with Underline */}
      <div className="absolute bottom-[9%] left-1/2 -translate-x-1/2 text-center z-20">
        <button
          onClick={onShopNow}
          className="group relative inline-block text-white text-xs sm:text-sm md:text-[15px] font-normal tracking-wide transition-opacity cursor-pointer drop-shadow-md"
        >
          <span className="font-sans font-medium text-white">Shop now</span>
          <span className="block h-[1px] w-full mx-auto bg-white transition-all duration-300 group-hover:scale-x-110 mt-1"></span>
        </button>
      </div>

      {/* 4. Floating Chat Support Icon at Bottom Right */}
      <button
        onClick={() => alert("Customer Support: Chat with ASHISH concierge.")}
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-30 w-11 h-11 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20"
        aria-label="Chat support"
        title="Live Chat"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 9H7v-2h10v2zm-4 4H7v-2h6v2zm4-8H7V5h10v2z"/>
        </svg>
      </button>
    </section>
  );
}
