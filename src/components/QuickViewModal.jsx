import React, { useState } from 'react';
import { X, Check, ShoppingBag, ShieldCheck, RefreshCw, Truck } from 'lucide-react';

export default function QuickViewModal({ product, isOpen, onClose, onAddToCart }) {
  if (!isOpen || !product) return null;

  const defaultSizes = product.sizes || ["S", "M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState(defaultSizes[0]);
  const [selectedImage, setSelectedImage] = useState(product.imagePrimary || product.image);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const images = [
    product.imagePrimary || product.image,
    product.imageSecondary
  ].filter(Boolean);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white text-black rounded-sm max-w-3xl w-full overflow-hidden shadow-2xl z-10 border border-neutral-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-neutral-100 transition-colors shadow-sm"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Images */}
          <div className="bg-neutral-100 p-4 md:p-6 flex flex-col justify-between">
            <div className="aspect-4/5 rounded-xs overflow-hidden bg-white border border-neutral-200 mb-3">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail switcher if multiple images */}
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-20 rounded-xs overflow-hidden border-2 transition-all ${
                      selectedImage === img ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Controls */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                {product.category || 'CONTEMPORARY STREETWEAR'}
              </span>

              <h2 className="font-anton text-xl md:text-2xl tracking-wide uppercase text-neutral-900 mb-3">
                {product.title}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-2.5 mb-5">
                <span className="font-mono text-xl font-bold text-black">
                  RS. {product.price.toLocaleString('en-IN')}
                </span>
                {product.compareAtPrice && (
                  <span className="font-mono text-sm text-neutral-400 line-through">
                    RS. {product.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs font-semibold">
                  TAX INCLUDED
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-600 leading-relaxed mb-6">
                {product.description ||
                  "Heavyweight custom construction engineered with architectural streetwear drape, reinforced stitching, and archival graphic treatments."}
              </p>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono uppercase font-semibold">Select Size</span>
                  <span className="text-[11px] font-mono text-neutral-400 underline cursor-pointer">
                    Size Guide
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {defaultSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-xs text-xs font-mono font-semibold transition-all ${
                        selectedSize === size
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-black border border-neutral-300 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions & Perks */}
            <div className="space-y-4 pt-4 border-t border-neutral-200">
              <button
                onClick={handleAdd}
                disabled={added}
                className="w-full flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white font-semibold py-4 rounded-sm text-xs uppercase tracking-widest transition-all shadow-md"
              >
                {added ? (
                  <>
                    <Check size={16} className="text-emerald-400" />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>ADD TO BAG</span>
                  </>
                )}
              </button>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] font-mono text-neutral-500 text-center">
                <div className="flex flex-col items-center gap-1">
                  <Truck size={14} className="text-black" />
                  <span>Free Express Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RefreshCw size={14} className="text-black" />
                  <span>7 Days Exchange</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck size={14} className="text-black" />
                  <span>100% Authentic</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
