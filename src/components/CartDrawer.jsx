import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { storeData } from '../data/storeData';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onOpenQuickView
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 10000;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeeded = freeShippingThreshold - subtotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white text-black shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-white z-10">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} />
              <h2 className="font-anton text-lg tracking-wider uppercase">
                Your cart ({cartItems.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-neutral-100 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#efefef] px-5 py-3 border-b border-neutral-200">
            <div className="flex justify-between items-center text-xs font-mono mb-1.5">
              {amountNeeded > 0 ? (
                <span>
                  Add <strong className="text-black">RS. {amountNeeded.toLocaleString('en-IN')}</strong> for Free Shipping
                </span>
              ) : (
                <span className="text-emerald-700 font-semibold">
                  🎉 You have qualified for FREE EXPRESS SHIPPING!
                </span>
              )}
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Content */}
          <div className="p-5 flex-1 overflow-y-auto space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                  <ShoppingBag size={28} />
                </div>
                <h3 className="font-anton text-xl tracking-wide uppercase mb-2">
                  Your bag is empty!
                </h3>
                <p className="text-xs text-neutral-500 mb-6 max-w-xs mx-auto">
                  Looks like you haven't added anything to your cart yet. Explore our latest drop.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-black text-white hover:bg-neutral-800 text-xs font-semibold uppercase tracking-wider rounded-full transition-colors"
                >
                  Start Shopping
                </button>

                {/* Recommendations in empty cart */}
                <div className="mt-10 text-left pt-6 border-t border-neutral-200">
                  <h4 className="font-mono text-xs uppercase text-neutral-500 mb-3">
                    Products you may like
                  </h4>
                  <div className="space-y-3">
                    {storeData.latestDropProducts.slice(0, 2).map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          onClose();
                          onOpenQuickView(prod);
                        }}
                        className="flex items-center gap-3 p-2 rounded-sm border border-neutral-200 hover:border-black cursor-pointer transition-colors"
                      >
                        <div className="w-14 h-16 bg-neutral-100 rounded-xs overflow-hidden shrink-0">
                          <img src={prod.imagePrimary} alt={prod.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-semibold truncate">{prod.title}</h5>
                          <span className="text-xs font-mono font-bold text-neutral-900">
                            RS. {prod.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <button className="text-xs font-mono uppercase underline text-neutral-600 hover:text-black">
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <ul className="space-y-4 divide-y divide-neutral-100">
                {cartItems.map((item) => (
                  <li key={`${item.id}-${item.selectedSize}`} className="pt-4 first:pt-0 flex gap-3.5">
                    {/* Item Thumbnail */}
                    <div className="w-20 h-24 bg-neutral-100 rounded-xs overflow-hidden shrink-0 border border-neutral-200">
                      <img
                        src={item.imagePrimary || item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-xs font-semibold text-neutral-900 line-clamp-1">
                            {item.title}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id, item.selectedSize)}
                            className="text-neutral-400 hover:text-red-600 transition-colors p-0.5"
                            title="Remove"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <span className="text-[11px] font-mono text-neutral-500 uppercase block mt-0.5">
                          Size: {item.selectedSize}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-neutral-300 rounded-xs">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                            className="p-1 hover:bg-neutral-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-2 text-xs font-mono font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                            className="p-1 hover:bg-neutral-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        {/* Line Total */}
                        <span className="text-xs font-mono font-bold">
                          RS. {(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Checkout Footer */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-neutral-50 border-t border-neutral-200 space-y-3">
              <div className="flex justify-between items-baseline text-sm">
                <span className="font-mono uppercase text-xs text-neutral-500">Estimated Total</span>
                <span className="font-mono text-lg font-bold">
                  RS. {subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[10px] font-mono text-neutral-400">
                Taxes and shipping calculated at checkout. Free returns on all domestic orders.
              </p>
              <button
                onClick={() => alert(`Redirecting to secure checkout for RS. ${subtotal.toLocaleString('en-IN')}`)}
                className="w-full flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white font-semibold py-4 rounded-sm text-xs uppercase tracking-widest transition-colors shadow-lg"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
