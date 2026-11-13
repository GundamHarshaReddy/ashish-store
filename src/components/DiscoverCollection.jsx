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
    <section id="collections" className="w-full py-14 md:py-20 px-4 md:px-8 bg-[#efefef] border-t border-neutral-300">
      <div className="max-w-[1720px] mx-auto">
        {/* Section Header */}
        <div className="flex items-baseline justify-between mb-8 pb-3 border-b border-neutral-300">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
              CURATED EDITORIAL ARCHIVES
            </span>
            <h2 className="font-anton text-2xl md:text-5xl tracking-wider text-black uppercase">
              discover collection
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-full border border-neutral-300 bg-white hover:bg-black hover:text-white transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-full border border-neutral-300 bg-white hover:bg-black hover:text-white transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Collection Slider Cards */}
        <div
          ref={sliderRef}
          className="flex gap-4 md:gap-6 overflow-x-auto custom-scrollbar pb-6 snap-x snap-mandatory"
        >
          {storeData.discoverCollections.map((col) => (
            <div
              key={col.id}
              onClick={() => onSelectCategory(col.title)}
              className="group relative shrink-0 w-[280px] sm:w-[340px] md:w-[400px] aspect-3/4 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer snap-start"
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
