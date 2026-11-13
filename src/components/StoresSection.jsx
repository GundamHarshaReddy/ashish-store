import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink } from 'lucide-react';
import { storeData } from '../data/storeData';

export default function StoresSection() {
  const [selectedStoreIndex, setSelectedStoreIndex] = useState(0);
  const activeStore = storeData.stores[selectedStoreIndex];

  return (
    <section id="stores-section" className="w-full py-14 md:py-20 px-4 md:px-8 bg-[#efefef] border-t border-neutral-300">
      <div className="max-w-[1720px] mx-auto">
        {/* Header */}
        <div className="mb-8 pb-3 border-b border-neutral-300 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
              RETAIL SPACES & DESTINATIONS
            </span>
            <h2 className="font-anton text-2xl md:text-5xl tracking-wider text-black uppercase">
              Stores across India
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-500 uppercase">
            6 Flagship Destinations
          </span>
        </div>

        {/* City Filter Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-6">
          {storeData.stores.map((store, idx) => (
            <button
              key={store.id}
              onClick={() => setSelectedStoreIndex(idx)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 uppercase font-mono tracking-wider ${
                selectedStoreIndex === idx
                  ? 'bg-black text-white shadow-md'
                  : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-300'
              }`}
            >
              {store.city}
            </button>
          ))}
        </div>

        {/* Active Store Showcase Card */}
        <div className="bg-white rounded-sm overflow-hidden border border-neutral-200/90 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Store Interior Image */}
          <div className="lg:col-span-7 relative min-h-[300px] md:min-h-[420px] bg-neutral-100 overflow-hidden">
            <img
              src={activeStore.image}
              alt={activeStore.city}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute top-4 left-4 z-10">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-wider font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                {activeStore.status}
              </span>
            </div>
          </div>

          {/* Store Details */}
          <div className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-between bg-white">
            <div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                FLAGSHIP BOUTIQUE
              </span>
              <h3 className="font-anton text-2xl md:text-3xl tracking-wide uppercase text-neutral-900 mb-6">
                {activeStore.city}
              </h3>

              <div className="space-y-4 text-xs md:text-sm text-neutral-700">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-black shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-neutral-900 block mb-0.5">Address</span>
                    <p className="leading-relaxed text-neutral-600">{activeStore.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-black shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-neutral-900 block mb-0.5">Contact</span>
                    <a
                      href={`tel:${activeStore.phone}`}
                      className="font-mono text-neutral-800 hover:text-black underline underline-offset-2"
                    >
                      {activeStore.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-black shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-neutral-900 block mb-0.5">Operating Hours</span>
                    <p className="font-mono text-neutral-600">{activeStore.timing}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-neutral-100 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={activeStore.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white font-semibold py-3 px-6 rounded-full text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                <Navigation size={14} />
                <span>Get Direction</span>
              </a>
              <a
                href={`tel:${activeStore.phone}`}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 border border-neutral-300 hover:border-black text-black font-semibold py-3 px-6 rounded-full text-xs uppercase tracking-wider transition-colors font-mono"
              >
                Call Store
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
