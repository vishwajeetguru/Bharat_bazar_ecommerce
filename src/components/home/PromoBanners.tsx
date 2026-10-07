import React from 'react';
import { ArrowRight, Tag, Sparkles, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const PromoBanners: React.FC = () => {
  const { navigateToCategory, setFilters, setCurrentView } = useStore();

  const handleBogoClick = () => {
    setFilters(prev => ({
      ...prev,
      category: 'Fashion',
      subcategory: 'T-Shirts & Tops',
      searchQuery: ''
    }));
    setCurrentView('shop');
  };

  const handleMasalaClick = () => {
    navigateToCategory('Grocery & Masala', 'Blended Masalas');
  };

  return (
    <section className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Banner 1: Buy 1 Get 1 on T-Shirts */}
      <div
        onClick={handleBogoClick}
        className="group relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-900 via-[#0F2340] to-blue-950 p-6 sm:p-8 text-white shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between min-h-[200px] border border-slate-700/60"
      >
        <div className="absolute right-0 top-0 bottom-0 w-2/5 overflow-hidden opacity-30 group-hover:opacity-40 transition-opacity">
          <img
            src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80"
            alt="T-Shirts BOGO"
            className="w-full h-full object-cover scale-110 group-hover:scale-120 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-10 max-w-sm">
          <div className="inline-flex items-center gap-1.5 bg-orange-500 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
            <Tag className="w-3 h-3" />
            Limited Offer
          </div>
          <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white leading-tight">
            Buy 1 Get 1 on Pure Cotton T-Shirts
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
            240 GSM heavy combed cotton. Mix & match across graphic tees and solid basics.
          </p>
        </div>

        <div className="relative z-10 mt-4 flex items-center gap-3">
          <button className="bg-white hover:bg-orange-50 text-slate-900 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-colors shadow-sm">
            <span>Explore T-Shirts</span>
            <ArrowRight className="w-3.5 h-3.5 text-orange-600" />
          </button>
          <span className="text-[11px] text-amber-300 font-medium font-mono">Use code: BOGO</span>
        </div>
      </div>

      {/* Banner 2: Flat 40% Off on Masalas */}
      <div
        onClick={handleMasalaClick}
        className="group relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#692602] via-[#853406] to-[#A3430B] p-6 sm:p-8 text-white shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between min-h-[200px] border border-amber-800/60"
      >
        <div className="absolute right-0 top-0 bottom-0 w-2/5 overflow-hidden opacity-35 group-hover:opacity-45 transition-opacity">
          <img
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80"
            alt="Pure Masalas"
            className="w-full h-full object-cover scale-110 group-hover:scale-120 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-10 max-w-sm">
          <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-slate-950" />
            Heritage Kitchen
          </div>
          <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white leading-tight">
            Flat 40% Off on Pure Spices & Masalas
          </h3>
          <p className="text-xs sm:text-sm text-amber-100 mt-1 leading-relaxed">
            Slow cold-ground Salem Turmeric, Deggi Mirch, and whole Shahi Garam Masala combos.
          </p>
        </div>

        <div className="relative z-10 mt-4 flex items-center gap-3">
          <button className="bg-white hover:bg-amber-50 text-slate-900 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-colors shadow-sm">
            <span>Shop Masala Combos</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
          </button>
          <span className="text-[11px] text-amber-200 font-medium">100% AGMARK Certified</span>
        </div>
      </div>
    </section>
  );
};
