import React from 'react';
import { Home, Compass, Search, MapPin, ShoppingBag } from 'lucide-react';

export default function MobileBottomNav({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenNavDrawer,
  onScrollToStores
}) {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 z-40 py-2 px-6 shadow-2xl curved-bottom-nav">
      <div className="flex items-center justify-between max-w-sm mx-auto">
        {/* Home */}
        <a
          href="/"
          className="flex flex-col items-center gap-1 text-neutral-800 hover:text-black transition-colors"
          aria-label="Home"
        >
          <Home size={19} />
          <span className="text-[9px] font-mono uppercase tracking-wider font-semibold">Home</span>
        </a>

        {/* Explore Drawer */}
        <button
          onClick={onOpenNavDrawer}
          className="flex flex-col items-center gap-1 text-neutral-800 hover:text-black transition-colors"
          aria-label="Explore Menu"
        >
          <Compass size={19} />
          <span className="text-[9px] font-mono uppercase tracking-wider font-semibold">Explore</span>
        </button>

        {/* Search */}
        <button
          onClick={onOpenSearch}
          className="flex flex-col items-center gap-1 text-neutral-800 hover:text-black transition-colors"
          aria-label="Search"
        >
          <Search size={19} />
          <span className="text-[9px] font-mono uppercase tracking-wider font-semibold">Search</span>
        </button>

        {/* Stores */}
        <button
          onClick={onScrollToStores}
          className="flex flex-col items-center gap-1 text-neutral-800 hover:text-black transition-colors"
          aria-label="Stores"
        >
          <MapPin size={19} />
          <span className="text-[9px] font-mono uppercase tracking-wider font-semibold">Stores</span>
        </button>

        {/* Cart */}
        <button
          onClick={onOpenCart}
          className="flex flex-col items-center gap-1 text-neutral-800 hover:text-black transition-colors relative"
          aria-label="Cart"
        >
          <div className="relative">
            <ShoppingBag size={19} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-orange-600 text-white font-mono text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[9px] font-mono uppercase tracking-wider font-semibold">Bag</span>
        </button>
      </div>
    </nav>
  );
}
