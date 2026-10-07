import React from 'react';
import { HeroSlider } from './HeroSlider';
import { CategoryTiles } from './CategoryTiles';
import { DealsSection } from './DealsSection';
import { PromoBanners } from './PromoBanners';
import { ProductGridSection } from './ProductGridSection';
import { useStore } from '../../context/StoreContext';

export const HomeView: React.FC = () => {
  const { products, navigateToCategory, setFilters, setCurrentView } = useStore();

  // 1. Trending in Fashion
  const trendingFashion = products.filter(
    p => (p.category === 'Fashion' || p.category === 'Kids Wear') && (p.trending || p.featured)
  ).slice(0, 4);

  // 2. Best Selling Masalas & Groceries
  const bestSellingGroceries = products.filter(
    p => p.category === 'Grocery & Masala'
  ).slice(0, 4);

  // 3. New Arrivals
  const newArrivals = products.filter(
    p => p.newArrival || p.isDeal
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
      {/* 1. Hero Carousel Slider */}
      <HeroSlider />

      {/* 2. Big Category Tiles (6-8 big visual boxes) */}
      <CategoryTiles />

      {/* 3. Today's Deals with Countdown Timer */}
      <DealsSection />

      {/* 4. Two Large Promo Banners Side-by-Side */}
      <PromoBanners />

      {/* 5. Trending in Fashion Grid */}
      <ProductGridSection
        title="Trending in Fashion"
        subtitle="Banarasi silks, hand-embroidered chikankari kurtas and pure cotton streetwear"
        badge="Ethnic & Western"
        products={trendingFashion.length > 0 ? trendingFashion : products.slice(0, 4)}
        onViewAll={() => navigateToCategory('Fashion')}
      />

      {/* 6. Best Selling Masalas & Groceries Grid */}
      <ProductGridSection
        title="Best Selling Masalas & Groceries"
        subtitle="100% pure cold-ground spices, 2-year matured basmati rice & cold pressed oils"
        badge="Farm Fresh Purity"
        products={bestSellingGroceries.length > 0 ? bestSellingGroceries : products.slice(10, 14)}
        onViewAll={() => navigateToCategory('Grocery & Masala')}
      />

      {/* 7. New Arrivals Across Store */}
      <ProductGridSection
        title="New Arrivals This Week"
        subtitle="Fresh additions across footwear, appliances, wellness and smart tech"
        badge="Just In"
        products={newArrivals.length > 0 ? newArrivals : products.slice(20, 24)}
        onViewAll={() => {
          setFilters(prev => ({ ...prev, category: 'All', sortBy: 'newest' }));
          setCurrentView('shop');
        }}
      />
    </div>
  );
};
