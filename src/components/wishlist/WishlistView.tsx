import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';

export const WishlistView: React.FC = () => {
  const { wishlist, products, toggleWishlist, addToCart, setCurrentView } = useStore();

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display flex items-center gap-2">
            <span>My Saved Wishlist</span>
            <span className="text-xs font-bold bg-rose-100 text-rose-700 px-2.5 py-0.5 rounded-full">
              {wishlistedProducts.length} Items
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Keep track of items you love and move them directly to your cart
          </p>
        </div>

        <button
          onClick={() => setCurrentView('shop')}
          className="text-xs font-bold text-orange-600 hover:underline cursor-pointer"
        >
          Browse More
        </button>
      </div>

      {/* Grid of Wishlisted Products */}
      {wishlistedProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlistedProducts.map(product => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs max-w-md mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Your wishlist is empty</h3>
          <p className="text-xs text-slate-500 mt-1">
            Tap the heart icon on any product to save it here for later.
          </p>
          <button
            onClick={() => setCurrentView('shop')}
            className="mt-5 bg-[#FF6B00] hover:bg-[#E65A00] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            Explore Catalog
          </button>
        </div>
      )}
    </div>
  );
};
