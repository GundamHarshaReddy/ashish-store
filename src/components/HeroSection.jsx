import React from 'react';

export default function HeroSection({ onShopNow }) {
  return (
    <section className="relative w-full h-[100svh] min-h-[640px] overflow-hidden bg-neutral-950">
      {/* Full-bleed high-fashion campaign photography covering entire viewport */}
      <div className="absolute inset-0 w-full h-full">
        <picture className="w-full h-full block">
          <img
            src="/images/hero/hero_main.jpg"
            alt="ASHISH Luxury Contemporary Streetwear Campaign"
            className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.03]"
            loading="eager"
            fetchPriority="high"
          />
        </picture>

        {/* Subtle cinematic gradient vignette for crisp logo & link contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* Centered Minimalist "Shop now" Link at bottom 9%, exactly matching reference */}
      <div className="absolute bottom-[9%] left-1/2 -translate-x-1/2 text-center z-20">
        <button
          onClick={onShopNow}
          className="group relative inline-block text-white text-sm md:text-[15px] font-normal tracking-wide transition-opacity cursor-pointer"
        >
          <span className="font-sans">Shop now</span>
          <span className="block h-[1px] w-2/3 mx-auto bg-white transition-all duration-300 group-hover:w-full mt-1"></span>
        </button>
      </div>
    </section>
  );
}
