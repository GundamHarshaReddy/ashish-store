import React from 'react';
import { ArrowRight, Eye, Plus } from 'lucide-react';
import { storeData } from '../data/storeData';

export default function HoodiesSection({ onOpenQuickView, onAddToCart }) {
  return (
    <section className="w-full pt-4 md:pt-6 pb-4 md:pb-6 px-2 sm:px-3 md:px-5 lg:px-6 bg-[#efefef] border-t border-neutral-300">
      <div className="w-full">
        {/* Section Header */}
        <div className="flex items-baseline justify-between mb-3 md:mb-4 pb-2 border-b border-neutral-300">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-0.5">
              HEAVYWEIGHT OUTERWEAR (500GSM)
            </span>
            <h2 className="font-anton text-2xl md:text-4xl tracking-wider text-black uppercase">
              Hoodies & Jackets
            </h2>
          </div>
          <a
            href="#collections"
            className="flex items-center gap-1.5 text-xs md:text-sm font-semibold uppercase tracking-wider text-black hover:text-neutral-600 transition-colors group"
          >
            <span>Discover more</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Responsive Grid: 4 columns desktop, 2 columns mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 md:gap-3">
          {storeData.hoodiesCollection.map((product) => (
            <div
              key={product.id}
              className="group product-card flex flex-col justify-between bg-white rounded-sm overflow-hidden border border-neutral-200/80 hover:border-black transition-all duration-300 shadow-2xs hover:shadow-md cursor-pointer"
              onClick={() => onOpenQuickView(product)}
            >
              {/* Product Image */}
              <div className="relative aspect-4/5 bg-neutral-100 overflow-hidden">
                <img
                  src={product.imagePrimary}
                  alt={product.title}
                  className="product-card-img product-card-img-primary absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />

                {product.imageSecondary && (
                  <img
                    src={product.imageSecondary}
                    alt={`${product.title} lifestyle view`}
                    className="product-card-img product-card-img-secondary absolute inset-0 w-full h-full object-cover opacity-0 group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                )}

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="text-[9px] md:text-[10px] font-mono uppercase bg-black text-white px-2 py-0.5 tracking-wider rounded-xs font-medium">
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Action Hover Overlay */}
                <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenQuickView(product);
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-white/95 hover:bg-white text-black text-xs font-semibold uppercase tracking-wider py-2.5 rounded-sm shadow-md transition-all backdrop-blur-xs"
                  >
                    <Eye size={13} />
                    <span>Quick View</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product, 'L');
                    }}
                    className="p-2.5 bg-black hover:bg-neutral-800 text-white rounded-sm shadow-md transition-colors"
                    title="Quick Add to Bag"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              {/* Information */}
              <div className="p-4 bg-white flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                    {product.category}
                  </span>
                  <h3 className="text-xs md:text-sm font-semibold text-neutral-900 leading-snug group-hover:text-black line-clamp-1 mb-2">
                    {product.title}
                  </h3>
                </div>

                <div className="flex items-baseline gap-2 pt-2 border-t border-neutral-100">
                  <span className="text-xs md:text-sm font-mono font-bold text-black">
                    RS. {product.price.toLocaleString('en-IN')}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-[11px] font-mono text-neutral-400 line-through">
                      RS. {product.compareAtPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
