import React, { useState } from 'react';
import Header from './components/Header';
import NavDrawer from './components/NavDrawer';
import StoryHighlights from './components/StoryHighlights';
import HeroSection from './components/HeroSection';
import FeaturedCollection from './components/FeaturedCollection';
import BagsSection from './components/BagsSection';
import DiscoverCollection from './components/DiscoverCollection';
import HoodiesSection from './components/HoodiesSection';
import PhoneCasesSection from './components/PhoneCasesSection';
import StoresSection from './components/StoresSection';
import BrandAccordion from './components/BrandAccordion';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import QuickViewModal from './components/QuickViewModal';
import MobileBottomNav from './components/MobileBottomNav';
import { storeData } from './data/storeData';

export default function App() {
  const [cartItems, setCartItems] = useState([
    {
      id: "ld-1",
      title: "Red Dragonfly T-Shirt",
      price: 7800,
      selectedSize: "L",
      quantity: 1,
      imagePrimary: "/images/products/drop_red_dragonfly_1.jpg"
    }
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);

  const handleAddToCart = (product, size = 'M', quantity = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      } else {
        return [
          ...prev,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            selectedSize: size,
            quantity: quantity,
            imagePrimary: product.imagePrimary || product.image
          }
        ];
      }
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id, size, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id, size);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedSize === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveItem = (id, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.selectedSize === size))
    );
  };

  const scrollToStores = () => {
    const el = document.getElementById('stores-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToLatestDrop = () => {
    const el = document.getElementById('latest-drop');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (cat) => {
    if (cat.toLowerCase().includes('bag')) {
      const el = document.getElementById('collections');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (cat.toLowerCase().includes('hoodie')) {
      const el = document.getElementById('latest-drop');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      scrollToLatestDrop();
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#efefef] flex flex-col justify-between selection:bg-black selection:text-white relative">
      {/* 1. Transparent Fixed Header floating over the Hero Banner */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNavDrawer={() => setIsNavDrawerOpen(true)}
        onOpenStories={() => setActiveStoryIndex(0)}
        onScrollToStores={scrollToStores}
        onOpenQuickView={(p) => setQuickViewProduct(p)}
      />

      {/* 2. Slide-out Explore Menu Drawer */}
      <NavDrawer
        isOpen={isNavDrawerOpen}
        onClose={() => setIsNavDrawerOpen(false)}
        onSelectCategory={handleSelectCategory}
        onScrollToStores={scrollToStores}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* 3. Hero Section starting at top: 0 */}
        <HeroSection onShopNow={scrollToLatestDrop} />

        {/* 4. Story Highlights Carousel */}
        <StoryHighlights
          onSelectCategory={handleSelectCategory}
          externalStoryIndex={activeStoryIndex}
          onCloseExternal={() => setActiveStoryIndex(null)}
        />

        {/* 5. Latest Drop Featured Collection */}
        <FeaturedCollection
          onOpenQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={handleAddToCart}
        />

        {/* 6. Ashish Bags Luxury Leather Showcase */}
        <BagsSection
          onOpenQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={handleAddToCart}
        />

        {/* 7. Discover Collection Editorial Cards */}
        <DiscoverCollection onSelectCategory={handleSelectCategory} />

        {/* 8. Hoodies & Outerwear Collection */}
        <HoodiesSection
          onOpenQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={handleAddToCart}
        />

        {/* 9. iPhone Case Accessories Showcase */}
        <PhoneCasesSection
          onOpenQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={handleAddToCart}
        />

        {/* 10. Stores Across India (Flagship Boutiques) */}
        <StoresSection />

        {/* 11. Brand Manifesto & FAQs Accordion */}
        <BrandAccordion />
      </main>

      {/* 12. Complete Footer */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* 13. Mobile Bottom Curved Floating Nav */}
      <MobileBottomNav
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNavDrawer={() => setIsNavDrawerOpen(true)}
        onScrollToStores={scrollToStores}
      />

      {/* 14. Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenQuickView={(p) => setQuickViewProduct(p)}
      />

      {/* 15. Predictive Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onOpenQuickView={(p) => setQuickViewProduct(p)}
      />

      {/* 16. Product Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
