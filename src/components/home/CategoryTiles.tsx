import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface CategoryTileItem {
  id: string;
  name: string;
  hindi: string;
  tagline: string;
  category: string;
  subcategory?: string;
  discount: string;
  image: string;
  colorScheme: string;
}

const TILES: CategoryTileItem[] = [
  {
    id: 'tile-women-ethnic',
    name: 'Women\'s Sarees & Lehengas',
    hindi: 'साड़ी व लहंगा चोली',
    tagline: 'Kanjivaram Silk, Banarasi & Georgette',
    category: 'Fashion',
    subcategory: 'Sarees',
    discount: 'Up to 65% Off',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    colorScheme: 'from-orange-600/90 to-amber-900/90'
  },
  {
    id: 'tile-men-ethnic',
    name: 'Men\'s Kurtas & Jackets',
    hindi: 'कुर्ता व नेहरू जैकेट',
    tagline: 'Chikankari Cotton, Linen & Modi Vests',
    category: 'Fashion',
    subcategory: 'Kurtas & Ethnic',
    discount: 'Min 50% Off',
    image: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=600&q=80',
    colorScheme: 'from-blue-900/90 to-slate-900/90'
  },
  {
    id: 'tile-masalas',
    name: 'Pure Masalas & Spices',
    hindi: 'शुद्ध मसाले व गरम मसाला',
    tagline: 'Salem Haldi, Kashmiri Mirch & Garam Masala',
    category: 'Grocery & Masala',
    subcategory: 'Blended Masalas',
    discount: 'Flat 40% Off',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    colorScheme: 'from-amber-700/90 to-red-950/90'
  },
  {
    id: 'tile-grocery-pantry',
    name: 'Aged Basmati Rice, Atta & Dal',
    hindi: 'बासमती चावल व दालें',
    tagline: '2-Year Matured Basmati & Unpolished Dal',
    category: 'Grocery & Masala',
    subcategory: 'Rice, Atta & Dals',
    discount: 'Up to 35% Off',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    colorScheme: 'from-emerald-800/90 to-slate-900/90'
  },
  {
    id: 'tile-oils-ghee',
    name: 'Cold Pressed Oils & Ghee',
    hindi: 'कच्ची घानी तेल व घी',
    tagline: 'Wood-Pressed Mustard, Groundnut & Sesame',
    category: 'Grocery & Masala',
    subcategory: 'Oils & Ghee',
    discount: 'Save Up to ₹150',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
    colorScheme: 'from-yellow-700/90 to-amber-950/90'
  },
  {
    id: 'tile-beauty-personal',
    name: 'Ayurvedic Beauty & Hair Care',
    hindi: 'आयुर्वेदिक सौंदर्य',
    tagline: 'Neem Face Wash & Bringadi Hair Oils',
    category: 'Beauty',
    discount: 'Flat 45% Off',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    colorScheme: 'from-rose-800/90 to-pink-950/90'
  },
  {
    id: 'tile-cookware-home',
    name: 'Tri-Ply Cookers & Brass Decor',
    hindi: 'रसोई बर्तन व पीतल दीया',
    tagline: 'Stainless Steel Cookers, Kadais & Pooja Lamps',
    category: 'Home & Kitchen',
    discount: 'Up to 50% Off',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
    colorScheme: 'from-indigo-900/90 to-slate-950/90'
  },
  {
    id: 'tile-kids-wear',
    name: 'Kids Festive & Casual Wear',
    hindi: 'बच्चों के कुर्ते व सेट',
    tagline: 'Cotton Lined Festive Sets for Boys & Girls',
    category: 'Kids Wear',
    discount: 'Under ₹899',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=600&q=80',
    colorScheme: 'from-purple-800/90 to-indigo-950/90'
  }
];

export const CategoryTiles: React.FC = () => {
  const { navigateToCategory, language } = useStore();

  return (
    <section className="my-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display tracking-tight flex items-center gap-2">
            <span>Explore By Categories</span>
            <span className="text-xs font-semibold bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
              Handpicked Essentials
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Discover quality products crafted for Indian homes and families
          </p>
        </div>
      </div>

      {/* Grid of 8 Big Category Boxes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {TILES.map(tile => (
          <button
            key={tile.id}
            onClick={() => navigateToCategory(tile.category, tile.subcategory)}
            className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 text-left cursor-pointer flex flex-col justify-end p-4 border border-slate-200/60"
          >
            {/* Background Image */}
            <img
              src={tile.image}
              alt={tile.name}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
            />

            {/* Gradient Scrim for high legibility */}
            <div className={`absolute inset-0 bg-gradient-to-t ${tile.colorScheme} opacity-85 group-hover:opacity-90 transition-opacity`} />

            {/* Top Discount Tag */}
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-white text-slate-900 text-[10px] sm:text-xs font-extrabold px-2.5 py-0.5 rounded-md shadow-sm">
                {tile.discount}
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 text-white">
              <span className="text-[11px] text-amber-200 font-medium block">
                {language === 'hi' ? tile.hindi : tile.tagline}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-200 transition-colors leading-snug mt-0.5">
                {tile.name}
              </h3>

              <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-white/90 group-hover:text-white group-hover:translate-x-1 transition-all">
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
