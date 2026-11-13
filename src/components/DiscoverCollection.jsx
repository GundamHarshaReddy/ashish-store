import React, { useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { storeData } from '../data/storeData';

export default function DiscoverCollection({ onSelectCategory }) {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const offset = direction === 'left' ? -420 : 420;
      sliderRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="collections" className="w-full pt-4 md:pt-6 pb-4 md:pb-6 px-2 sm:px-3 md:px-5 lg:px-6 bg-[#efefef] border-t border-neutral-300">
      <div className="w-full">
        {/* Section Header */}
        <div className="flex items-baseline justify-between mb-3 md:mb-4 pb-2 border-b border-neutral-300">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-0.5">
              CURATED EDITORIAL ARCHIVES
            </span>
            <h2 className="font-anton text-2xl md:text-4xl tracking-wider text-black uppercase">
              discover collection
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-neutral-300 bg-white hover:bg-black hover:text-white transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-neutral-300 bg-white hover:bg-black hover:text-white transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Collection Slider Cards - Edge-to-Edge Full Width */}
        <div
          ref={sliderRef}
          className="flex gap-2 sm:gap-2.5 md:gap-3 overflow-x-auto custom-scrollbar pb-3 snap-x snap-mandatory"
        >
          {storeData.discoverCollections.map((col) => (
            <div
              key={col.id}
              onClick={() => onSelectCategory(col.title)}
              className="group relative shrink-0 w-[240px] sm:w-[290px] md:w-[340px] lg:w-[380px] aspect-3/4 rounded-sm overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-500 cursor-pointer snap-start"
            >
              {/* Background Editorial Image */}
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.85] group-hover:brightness-[0.9]"
                loading="lazy"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

              {/* Card Content Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end text-white z-10">
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-300 mb-1">
                  {col.subtitle}
                </span>

                <h3 className="font-anton text-2xl md:text-3xl lg:text-4xl tracking-wider uppercase mb-5 leading-none">
                  {col.title}
                </h3>

                <div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCategory(col.title);
                    }}
                    className="inline-flex items-center gap-2 bg-white text-black hover:bg-neutral-200 text-xs font-semibold uppercase tracking-[0.15em] px-6 py-3 rounded-full transition-all group-hover:px-7 shadow-lg"
                  >
                    <span>Shop Now</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
