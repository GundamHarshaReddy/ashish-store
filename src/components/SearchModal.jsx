import React, { useState } from 'react';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { storeData } from '../data/storeData';

export default function SearchModal({ isOpen, onClose, onOpenQuickView }) {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('');

  // Collect all searchable products
  const allProducts = [
    ...storeData.latestDropProducts,
    ...storeData.bagsCollection,
    ...storeData.hoodiesCollection,
    ...storeData.phoneCasesCollection
  ];

  const filtered = searchQuery.trim()
    ? allProducts.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const trendingTags = ["Hoodies", "Polo T-Shirts", "Card Case", "Dragonfly", "Star Studded", "iPhone Case", "Duffle Bag"];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex flex-col justify-start">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Search Drawer Top */}
      <div className="relative w-full bg-white text-black shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 md:p-8">
          {/* Header & Input */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-300 gap-4">
            <div className="flex items-center gap-3 flex-1">
              <Search size={22} className="text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by collection, item, color or keyword..."
                autoFocus
                className="w-full text-base md:text-xl font-medium placeholder-neutral-400 focus:outline-hidden"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 hover:bg-neutral-100 rounded-full text-neutral-400 hover:text-black"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-600 hover:text-black"
              aria-label="Close search"
            >
              <X size={22} />
            </button>
          </div>

          {/* Quick Trending Searches */}
          {!searchQuery && (
            <div className="py-6">
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 block mb-3">
                Trending Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSearchQuery(tag)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-200 hover:border-black text-xs font-mono uppercase transition-colors"
                  >
                    <Tag size={11} className="text-neutral-400" />
                    <span>{tag}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Instant Filtered Results */}
          {searchQuery && (
            <div className="py-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                  {filtered.length} Results Found
                </span>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-8 text-neutral-500 text-xs">
                  No matching items found for "{searchQuery}". Try searching for "Hoodie", "Polo", or "Card Case".
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filtered.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        onClose();
                        onOpenQuickView(item);
                      }}
                      className="group p-2 rounded-sm border border-neutral-200 hover:border-black cursor-pointer transition-all bg-white"
                    >
                      <div className="aspect-4/5 bg-neutral-100 rounded-xs overflow-hidden mb-2">
                        <img
                          src={item.imagePrimary || item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h5 className="text-xs font-semibold truncate text-neutral-900 group-hover:text-black">
                        {item.title}
                      </h5>
                      <span className="text-xs font-mono font-bold text-black block mt-1">
                        RS. {item.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
