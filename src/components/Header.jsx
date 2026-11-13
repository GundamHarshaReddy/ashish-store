import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, MapPin, User, Menu, X, ChevronDown } from 'lucide-react';
import { storeData } from '../data/storeData';

export default function Header({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenNavDrawer,
  onScrollToStores,
  onOpenQuickView
}) {
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [isCollectionsHovered, setIsCollectionsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  // Cycle announcements
  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % storeData.announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Header background transition on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-colors duration-300">
      {/* 1. TOP SLENDER ANNOUNCEMENT TICKER (Translucent on Hero, Solid when Scrolled) */}
      <div
        className={`w-full py-1.5 px-4 md:px-8 text-[11px] font-medium tracking-wider flex items-center justify-between transition-colors duration-300 border-b select-none ${
          isScrolled
            ? 'bg-neutral-900 text-white border-neutral-800'
            : 'bg-black/35 backdrop-blur-xs text-white/90 border-white/10'
        }`}
      >
        {/* Left Notification Pill */}
        <button
          onClick={() => setShowNotificationPopup(!showNotificationPopup)}
          className="flex items-center gap-1.5 hover:text-white transition-colors text-[10px] uppercase font-mono tracking-wider cursor-pointer"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
          <span className="underline decoration-white/40 underline-offset-2">
            {storeData.announcements.length} Notifications
          </span>
        </button>

        {/* Center Marquee / Active announcement */}
        <div className="overflow-hidden whitespace-nowrap text-center max-w-xl mx-auto flex-1 px-4 cursor-pointer">
          <span
            key={announcementIndex}
            className="inline-block transition-opacity duration-500 font-sans uppercase tracking-[0.16em] text-[10px] md:text-[11px]"
          >
            {storeData.announcements[announcementIndex]}
          </span>
        </div>

        {/* Right Info */}
        <div className="hidden md:flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-white/70">
          <span>INDIA (INR ₹)</span>
        </div>

        {/* Dropdown Notification popup */}
        {showNotificationPopup && (
          <div className="absolute top-full left-4 mt-2 w-80 bg-neutral-950/95 backdrop-blur-md border border-neutral-700 p-4 rounded shadow-2xl text-white text-xs z-50">
            <div className="flex justify-between items-center mb-2 pb-2 border-b border-neutral-800">
              <span className="font-semibold uppercase tracking-wider text-[11px] font-mono">
                Active Broadcasts
              </span>
              <button
                onClick={() => setShowNotificationPopup(false)}
                className="text-white/60 hover:text-white"
              >
                <X size={14} />
              </button>
            </div>
            <ul className="space-y-2">
              {storeData.announcements.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[11px] text-neutral-300">
                  <span className="text-orange-500 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 2. MAIN HEADER BAR (Transparent floating on Hero, Solid White on Scroll) */}
      <div
        className={`w-full px-4 md:px-8 py-3 md:py-4 transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md text-black border-neutral-200/90 shadow-xs'
            : 'bg-transparent text-white border-transparent'
        }`}
      >
        <div className="max-w-[1720px] mx-auto flex items-center justify-between relative">
          {/* LEFT: Explore Menu & Category Navigation */}
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenNavDrawer}
              className={`flex items-center gap-2 group font-semibold text-xs tracking-wider uppercase transition-opacity hover:opacity-75 ${
                isScrolled ? 'text-black' : 'text-white'
              }`}
              aria-label="Open Explore Menu"
            >
              <Menu size={18} strokeWidth={2.2} />
              <span className="hidden sm:inline font-mono">explore</span>
            </button>

            <nav className="hidden lg:flex items-center gap-6 text-[13px] font-normal tracking-tight">
              <a
                href="#latest-drop"
                className={`transition-colors text-xs font-medium hover:opacity-75 ${
                  isScrolled ? 'text-black' : 'text-white'
                }`}
              >
                New in
              </a>

              {/* Collections with Hover Mega Menu */}
              <div
                className="relative py-2"
                onMouseEnter={() => setIsCollectionsHovered(true)}
                onMouseLeave={() => setIsCollectionsHovered(false)}
              >
                <button
                  className={`flex items-center gap-1 transition-colors text-xs font-medium hover:opacity-75 cursor-pointer ${
                    isScrolled ? 'text-black' : 'text-white'
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
                  <div className="absolute top-full -left-20 w-[840px] bg-white text-black border border-neutral-200/90 shadow-2xl rounded-sm p-6 mega-menu-enter z-50">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-100">
                      <span className="font-anton tracking-wider text-sm text-black">
                        FEATURED COLLECTIONS
                      </span>
                      <a href="#collections" className="text-xs font-mono uppercase underline hover:opacity-60 text-neutral-600">
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
            </nav>
          </div>

          {/* CENTER: THE LOGO FLOATING DIRECTLY ON TOP OF BANNER */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
            <a href="/" className="inline-block group py-1 text-center" aria-label="ASHISH Home">
              <span
                className={`font-anton text-2xl sm:text-3xl tracking-[0.22em] uppercase transition-colors duration-300 drop-shadow-sm ${
                  isScrolled ? 'text-black' : 'text-white'
                }`}
              >
                ASHISH
              </span>
            </a>
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-4 md:gap-5">
            {/* Store Locator */}
            <button
              onClick={onScrollToStores}
              className={`p-1 transition-opacity hover:opacity-75 ${
                isScrolled ? 'text-black' : 'text-white'
              }`}
              title="Our Stores"
              aria-label="Stores across India"
            >
              <MapPin size={18} strokeWidth={1.8} />
            </button>

            {/* Predictive Search */}
            <button
              onClick={onOpenSearch}
              className={`p-1 transition-opacity hover:opacity-75 ${
                isScrolled ? 'text-black' : 'text-white'
              }`}
              title="Search Products"
              aria-label="Search"
            >
              <Search size={18} strokeWidth={1.8} />
            </button>

            {/* Account */}
            <button
              onClick={() => alert("Member authentication portal. Login / Register with mobile or email.")}
              className={`hidden sm:block p-1 transition-opacity hover:opacity-75 ${
                isScrolled ? 'text-black' : 'text-white'
              }`}
              title="Account"
              aria-label="Account Login"
            >
              <User size={18} strokeWidth={1.8} />
            </button>

            {/* Cart Trigger with dynamic count */}
            <button
              onClick={onOpenCart}
              className={`flex items-center gap-1.5 p-1 transition-opacity hover:opacity-75 relative font-mono text-xs font-semibold ${
                isScrolled ? 'text-black' : 'text-white'
              }`}
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={18} strokeWidth={1.8} />
              <span className="tracking-tighter font-mono">
                Cart ({cartCount})
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
