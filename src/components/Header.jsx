import React, { useState, useEffect } from 'react';
import { Search, MapPin, User, Bookmark, ChevronDown } from 'lucide-react';
import { storeData } from '../data/storeData';

export default function Header({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenNavDrawer,
  onOpenStories,
  onScrollToStores,
  onOpenQuickView
}) {
  const [isCollectionsHovered, setIsCollectionsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Transition on scroll past hero
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300">
      {/* MAIN HEADER BAR */}
      <div
        className={`w-full px-4 sm:px-6 md:px-8 py-3.5 sm:py-4 transition-colors duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md text-black border-b border-neutral-200/90 shadow-2xs'
            : 'bg-transparent text-white'
        }`}
      >
        <div className="max-w-[1720px] mx-auto flex items-center justify-between relative">
          {/* LEFT: New in & Collections (Hidden on mobile to preserve clean centered logo) */}
          <div className="hidden md:flex items-center gap-6 sm:gap-8">
            <a
              href="#latest-drop"
              className={`text-[12px] sm:text-[13px] font-medium transition-opacity tracking-normal ${
                isScrolled ? 'text-black hover:opacity-60' : 'text-white/90 hover:text-white drop-shadow-xs'
              }`}
            >
              New in
            </a>

            {/* Collections with Mega Menu */}
            <div
              className="relative py-1"
              onMouseEnter={() => setIsCollectionsHovered(true)}
              onMouseLeave={() => setIsCollectionsHovered(false)}
            >
              <button
                className={`flex items-center gap-1 text-[12px] sm:text-[13px] font-medium transition-opacity cursor-pointer ${
                  isScrolled ? 'text-black hover:opacity-60' : 'text-white/90 hover:text-white drop-shadow-xs'
                }`}
              >
                <span>Collections</span>
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${isCollectionsHovered ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Mega Menu Dropdown */}
              {isCollectionsHovered && (
                <div className="absolute top-full -left-10 w-[820px] bg-white text-black border border-neutral-200 shadow-2xl rounded-sm p-6 mega-menu-enter z-50">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-100">
                    <span className="font-anton tracking-wider text-sm text-black uppercase">
                      Featured Collections
                    </span>
                    <a
                      href="#collections"
                      className="text-xs font-mono uppercase underline hover:opacity-60 text-neutral-600"
                    >
                      View All
                    </a>
                  </div>
                  <div className="grid grid-cols-6 gap-3">
                    {storeData.megaMenuCollections.map((col, idx) => (
                      <a
                        key={idx}
                        href="#collections"
                        className="group block text-center"
                        onClick={() => setIsCollectionsHovered(false)}
                      >
                        <div className="aspect-3/4 rounded-sm overflow-hidden bg-neutral-100 mb-2 border border-neutral-200 group-hover:border-black transition-colors">
                          <img
                            src={col.image}
                            alt={col.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <span className="text-[11px] font-medium block leading-tight text-neutral-800 group-hover:text-black">
                          {col.title}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CENTER: BRAND LOGO "ASHISH" IN BOLD BLACK GEOMETRIC LETTERING */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-auto">
            <a href="/" className="inline-block group py-1 text-center" aria-label="ASHISH Home">
              <span className="font-anton text-2xl sm:text-[28px] md:text-3xl tracking-[0.24em] uppercase text-black select-none">
                ASHISH
              </span>
            </a>
          </div>

          {/* RIGHT: EXACT ACTION ICONS MATCHING REFERENCE SCREENSHOT */}
          <div
            className={`ml-auto flex items-center gap-2.5 sm:gap-3.5 md:gap-4.5 ${
              isScrolled ? 'text-black' : 'text-white'
            }`}
          >
            {/* 1. Circular Stories Badge with Glowing Blue Ring & Camera Cards */}
            <button
              onClick={onOpenStories}
              className="relative p-[1.5px] rounded-full hover:scale-105 transition-transform cursor-pointer"
              title="Stories"
              aria-label="View Stories"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-[#0066ff] via-[#00c8ff] to-[#3b82f6] p-[2px] flex items-center justify-center shadow-[0_0_10px_rgba(0,180,255,0.6)]">
                <div className="w-full h-full bg-[#050b14] rounded-full flex items-center justify-center overflow-hidden">
                  <div className="w-3.5 h-3.5 text-white flex items-center justify-center">
                    {/* Multi-story photo stack icon */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                      <rect x="3" y="3" width="14" height="14" rx="2" stroke="white" fill="#0066ff" fillOpacity="0.4"/>
                      <path d="M7 21h12a2 2 0 0 0 2-2V7" stroke="white"/>
                    </svg>
                  </div>
                </div>
              </div>
            </button>

            {/* 2. Store Locator Pin */}
            <button
              onClick={onScrollToStores}
              className="p-1 hover:opacity-60 transition-opacity cursor-pointer hidden md:block"
              title="Our Stores"
              aria-label="Stores across India"
            >
              <MapPin size={17} strokeWidth={1.8} />
            </button>

            {/* 3. Search Magnifying Glass */}
            <button
              onClick={onOpenSearch}
              className="p-1 hover:opacity-60 transition-opacity cursor-pointer hidden sm:block"
              title="Search Products"
              aria-label="Search"
            >
              <Search size={17} strokeWidth={1.8} />
            </button>

            {/* 4. User Account */}
            <button
              onClick={() => alert("Member authentication portal. Login / Register with mobile or email.")}
              className="p-1 hover:opacity-60 transition-opacity cursor-pointer hidden lg:block"
              title="Account"
              aria-label="Account Login"
            >
              <User size={17} strokeWidth={1.8} />
            </button>

            {/* 5. Wishlist Ribbon Bookmark Icon */}
            <button
              onClick={() => alert("Your wishlist is saved.")}
              className="p-1 hover:opacity-60 transition-opacity cursor-pointer hidden md:block"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Bookmark size={17} strokeWidth={1.8} />
            </button>

            {/* 6. Cart Bag Icon */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-1.5 p-1 hover:opacity-60 transition-opacity cursor-pointer relative"
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                {/* Clean cart bag outline matching reference */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                  <path d="M3 6h18"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-black text-white text-[9px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                    {cartCount}
                  </span>
                )}
              </div>
            </button>

            {/* 7. Rounded White Pill Menu Button with 2 Horizontal Lines (=) */}
            <button
              onClick={onOpenNavDrawer}
              className="px-2.5 sm:px-3 py-1.5 rounded-full bg-white text-black shadow-sm border border-neutral-200/80 hover:bg-neutral-100 transition-all flex items-center justify-center cursor-pointer"
              aria-label="Open Navigation Menu"
              title="Menu"
            >
              <div className="flex flex-col gap-[3.5px] w-3.5 sm:w-4 py-0.5">
                <span className="w-full h-[1.8px] bg-black rounded-full"></span>
                <span className="w-full h-[1.8px] bg-black rounded-full"></span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
