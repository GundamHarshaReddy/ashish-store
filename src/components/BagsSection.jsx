import React, { useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { storeData } from '../data/storeData';

export default function BagsSection({ onOpenQuickView, onAddToCart }) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="collections" className="w-full pt-4 md:pt-6 pb-4 md:pb-6 px-2 sm:px-3 md:px-5 lg:px-6 bg-[#efefef] border-t border-neutral-300">
      <div className="w-full">
        {/* Section Header */}
        <div className="flex items-baseline justify-between mb-3 md:mb-4 pb-2 border-b border-neutral-300">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-0.5">
              LEATHER GOODS & ACCESSORIES
            </span>
            <h2 className="font-anton text-2xl md:text-4xl tracking-wider text-black uppercase">
              Ashish Bags
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

        {/* 5-Column Edge-to-Edge Grid (Fully Occupied) */}
        <div
          ref={scrollContainerRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5 md:gap-3"
        >
          {storeData.bagsCollection.map((item) => (
            <div
              key={item.id}
              className="group product-card flex flex-col justify-between bg-white rounded-sm overflow-hidden border border-neutral-200 hover:border-black transition-all duration-300 shadow-2xs hover:shadow-md cursor-pointer"
              onClick={() => onOpenQuickView(item)}
            >
              {/* Image with hover transition */}
              <div className="relative aspect-4/5 bg-neutral-100 overflow-hidden">
                <img
                  src={item.imagePrimary}
                  alt={item.title}
                  className="product-card-img product-card-img-primary absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                {item.imageSecondary && (
                  <img
                    src={item.imageSecondary}
                    alt={item.title}
                    className="product-card-img product-card-img-secondary absolute inset-0 w-full h-full object-cover opacity-0 group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                )}

                {item.badge && (
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="text-[9px] font-mono uppercase bg-black text-white px-2 py-0.5 tracking-wider rounded-xs font-medium">
                      {item.badge}
                    </span>
                  </div>
                )}

                {/* Quick Add Overlay */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(item, item.sizes ? item.sizes[0] : 'ONE SIZE');
                  }}
                  className="absolute bottom-3 right-3 p-2.5 bg-black hover:bg-neutral-800 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                  title="Add to Cart"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Information */}
              <div className="p-4 bg-white flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-xs md:text-sm font-semibold text-neutral-900 leading-snug group-hover:text-black line-clamp-1 mb-2">
                    {item.title}
                  </h3>
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs md:text-sm font-mono font-bold text-black">
                    RS. {item.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-neutral-500">
                    {item.sizes ? item.sizes[0] : 'ONE SIZE'}
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
