import React from 'react';
import { ArrowRight, Eye, Plus } from 'lucide-react';
import { storeData } from '../data/storeData';

export default function FeaturedCollection({ onOpenQuickView, onAddToCart }) {
  return (
    <section id="latest-drop" className="w-full py-12 md:py-16 px-4 md:px-8 bg-[#efefef]">
      <div className="max-w-[1720px] mx-auto">
        {/* Section Header */}
        <div className="flex items-baseline justify-between mb-8 pb-3 border-b border-neutral-300">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
              SPRING '26 CAPSULE
            </span>
            <h2 className="font-anton text-2xl md:text-4xl tracking-wider text-black uppercase">
              Latest drop
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

        {/* Product Grid: 4 columns desktop, 2 columns mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {storeData.latestDropProducts.map((product) => (
            <div
              key={product.id}
              className="group product-card flex flex-col justify-between bg-white rounded-sm overflow-hidden border border-neutral-200/80 hover:border-black transition-all duration-300 shadow-2xs hover:shadow-md cursor-pointer"
              onClick={() => onOpenQuickView(product)}
            >
              {/* Image Container with Hover Flip */}
              <div className="relative aspect-4/5 bg-neutral-100 overflow-hidden">
                {/* Primary Studio Shot */}
                <img
                  src={product.imagePrimary}
                  alt={product.title}
                  className="product-card-img product-card-img-primary absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Secondary On-Model Shot */}
                {product.imageSecondary && (
                  <img
                    src={product.imageSecondary}
                    alt={`${product.title} on model`}
                    className="product-card-img product-card-img-secondary absolute inset-0 w-full h-full object-cover opacity-0 group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                )}

                {/* Badges */}
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
                  {product.badge && (
                    <span className="text-[9px] md:text-[10px] font-mono uppercase bg-black text-white px-2 py-0.5 tracking-wider rounded-xs font-medium">
                      {product.badge}
                    </span>
                  )}
                  {product.compareAtPrice && (
                    <span className="text-[9px] md:text-[10px] font-mono uppercase bg-orange-600 text-white px-2 py-0.5 tracking-wider rounded-xs font-medium">
                      SALE
                    </span>
                  )}
                </div>

                {/* Quick View Button overlay on hover */}
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
                      onAddToCart(product, product.sizes ? product.sizes[1] : 'M');
                    }}
                    className="p-2.5 bg-black hover:bg-neutral-800 text-white rounded-sm shadow-md transition-colors"
                    title="Quick Add to Bag"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3.5 md:p-4 bg-white flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                    {product.category}
                  </span>
                  <h3 className="text-xs md:text-sm font-semibold text-neutral-900 leading-snug group-hover:text-black line-clamp-1 mb-2">
                    {product.title}
                  </h3>
                </div>

                {/* Pricing matching ASHISH formatting */}
                <div className="flex items-baseline gap-2 pt-1 border-t border-neutral-100">
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
