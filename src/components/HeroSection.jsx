import React from 'react';

export default function HeroSection({ onShopNow }) {
  return (
    <section className="relative w-full h-[100svh] min-h-[580px] max-h-[1050px] overflow-hidden bg-neutral-950">
      {/* Full-bleed responsive campaign imagery covering entire viewport */}
      <div className="absolute inset-0 w-full h-full">
        <picture className="w-full h-full block">
          {/* Dedicated vertical 9:16 portrait image for mobile screens */}
          <source
            media="(max-width: 768px)"
            srcSet="/images/hero/hero_mobile.jpg"
          />
          {/* High-res 16:9 landscape image for tablets and desktop */}
          <img
            src="/images/hero/hero_main.jpg"
            alt="ASHISH Luxury Contemporary Streetwear Campaign"
            className="w-full h-full object-cover object-top sm:object-center filter brightness-[0.93] contrast-[1.03]"
            loading="eager"
            fetchPriority="high"
          />
        </picture>

        {/* Cinematic gradient overlay: subtle darkening at top for logo & bottom for CTA */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/65 pointer-events-none" />
      </div>

      {/* Centered Minimalist "Shop now" Link at bottom (matching reference 9%-14%) */}
      <div className="absolute bottom-[14%] sm:bottom-[9%] left-1/2 -translate-x-1/2 text-center z-20">
        <button
          onClick={onShopNow}
          className="group relative inline-block text-white text-xs sm:text-sm md:text-[15px] font-normal tracking-wider transition-opacity cursor-pointer uppercase font-mono"
        >
          <span>Shop now</span>
          <span className="block h-[1px] w-2/3 mx-auto bg-white transition-all duration-300 group-hover:w-full mt-1"></span>
        </button>
      </div>
    </section>
  );
}
