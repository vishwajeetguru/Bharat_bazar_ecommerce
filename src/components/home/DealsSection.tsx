import React, { useState, useEffect, useRef } from 'react';
import { Flame, Clock, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';

export const DealsSection: React.FC = () => {
  const { products, setCurrentView, setFilters } = useStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Live countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 6,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter deal products
  const dealProducts = products.filter(p => p.isDeal || p.discount >= 40);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <section className="my-8 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50/50 p-4 sm:p-6 rounded-2xl border border-orange-200/80 shadow-xs">
      {/* Header with Title & Timer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 border-b border-orange-200/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF6B00] text-white flex items-center justify-center shadow-md">
            <Flame className="w-6 h-6 fill-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
                Today's Flash Deals
              </h2>
              <span className="bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
                Live
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Limited stocks at maximum discounted prices. Refreshed daily.
            </p>
          </div>
        </div>

        {/* Countdown Timer Display */}
        <div className="flex items-center gap-3 self-stretch sm:self-auto justify-between sm:justify-start">
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-orange-200 shadow-xs">
            <Clock className="w-4 h-4 text-orange-600" />
            <span className="text-xs font-semibold text-slate-700">Ends In:</span>
            <div className="flex items-center gap-1 font-mono font-bold text-xs text-orange-600 tabular-nums">
              <span className="bg-orange-100 text-orange-900 px-1.5 py-0.5 rounded">
                {pad(timeLeft.hours)}h
              </span>
              <span>:</span>
              <span className="bg-orange-100 text-orange-900 px-1.5 py-0.5 rounded">
                {pad(timeLeft.minutes)}m
              </span>
              <span>:</span>
              <span className="bg-orange-100 text-orange-900 px-1.5 py-0.5 rounded">
                {pad(timeLeft.seconds)}s
              </span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              className="w-8 h-8 rounded-lg bg-white hover:bg-orange-100 border border-orange-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              title="Scroll Left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-8 h-8 rounded-lg bg-white hover:bg-orange-100 border border-orange-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              title="Scroll Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scrollable Product Track */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-3 pt-1 no-scrollbar scroll-smooth"
      >
        {dealProducts.map(product => (
          <div key={product.id} className="w-64 sm:w-72 shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* View All Deals button */}
      <div className="mt-3 text-center sm:text-right">
        <button
          onClick={() => {
            setFilters(prev => ({ ...prev, minDiscount: 40, category: 'All' }));
            setCurrentView('shop');
          }}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors cursor-pointer"
        >
          <span>See All 24+ Flash Deals</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
