import React, { useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { storeData } from '../data/storeData';

export default function PhoneCasesSection({ onOpenQuickView, onAddToCart }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full pt-4 md:pt-6 pb-4 md:pb-6 px-2 sm:px-3 md:px-5 lg:px-6 bg-[#efefef] border-t border-neutral-300">
      <div className="w-full">
        {/* Section Header */}
        <div className="flex items-baseline justify-between mb-3 md:mb-4 pb-2 border-b border-neutral-300">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-0.5">
              MAGSAFE ACCESSORIES
            </span>
            <h2 className="font-anton text-2xl md:text-4xl tracking-wider text-black uppercase">
              iPhone Case
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#collections"
              className="flex items-center gap-1.5 text-xs md:text-sm font-semibold uppercase tracking-wider text-black hover:text-neutral-600 transition-colors group"
            >
              <span>Discover more</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* 6-Column Edge-to-Edge Grid (Fully Occupied) */}
        <div
          ref={scrollRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5 md:gap-3"
        >
          {storeData.phoneCasesCollection.map((caseItem) => (
            <div
              key={caseItem.id}
              className="group product-card flex flex-col justify-between bg-white rounded-sm overflow-hidden border border-neutral-200 hover:border-black transition-all duration-300 shadow-2xs hover:shadow-md cursor-pointer"
              onClick={() => onOpenQuickView(caseItem)}
            >
              <div className="relative aspect-4/5 bg-neutral-100 overflow-hidden flex items-center justify-center p-4">
                <img
                  src={caseItem.image}
                  alt={caseItem.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(caseItem, 'iPhone 16 Pro');
                  }}
                  className="absolute bottom-3 right-3 p-2 bg-black hover:bg-neutral-800 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  title="Quick Add Case"
                >
                  <Plus size={14} />
                </button>
              </div>

              <div className="p-3.5 bg-white flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[9px] font-mono uppercase text-neutral-400 block mb-1">
                    MagSafe Protection
                  </span>
                  <h3 className="text-xs md:text-sm font-semibold text-neutral-900 leading-snug group-hover:text-black line-clamp-1 mb-2">
                    {caseItem.title}
                  </h3>
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-black">
                    From RS. {caseItem.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    4 Models
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
