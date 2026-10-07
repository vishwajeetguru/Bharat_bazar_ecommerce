import React from 'react';
import { Home, Grid, ShoppingBag, User, Heart } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const MobileBottomNav: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartCount,
    setIsCartOpen,
    user,
    setIsAuthModalOpen,
    wishlist
  } = useStore();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-lg px-2 py-1.5 flex items-center justify-around">
      {/* Home */}
      <button
        onClick={() => {
          setCurrentView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center py-1 px-3 text-[10px] font-bold transition-colors cursor-pointer ${
          currentView === 'home' ? 'text-[#FF6B00]' : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <Home className="w-5 h-5 mb-0.5" />
        <span>Home</span>
      </button>

      {/* Categories / Shop */}
      <button
        onClick={() => {
          setCurrentView('shop');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center py-1 px-3 text-[10px] font-bold transition-colors cursor-pointer ${
          currentView === 'shop' ? 'text-[#FF6B00]' : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <Grid className="w-5 h-5 mb-0.5" />
        <span>Categories</span>
      </button>

      {/* Wishlist */}
      <button
        onClick={() => {
          setCurrentView('wishlist');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`relative flex flex-col items-center py-1 px-3 text-[10px] font-bold transition-colors cursor-pointer ${
          currentView === 'wishlist' ? 'text-[#FF6B00]' : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <div className="relative">
          <Heart className="w-5 h-5 mb-0.5" />
          {wishlist.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </div>
        <span>Wishlist</span>
      </button>

      {/* Cart */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative flex flex-col items-center py-1 px-3 text-[10px] font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 mb-0.5 text-[#FF6B00]" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#FF6B00] text-white text-[9px] font-bold rounded-full px-1 min-w-[15px] h-[15px] flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
        <span>Cart</span>
      </button>

      {/* Account */}
      <button
        onClick={() => {
          if (user) {
            setCurrentView('orders');
          } else {
            setIsAuthModalOpen(true);
          }
        }}
        className={`flex flex-col items-center py-1 px-3 text-[10px] font-bold transition-colors cursor-pointer ${
          currentView === 'orders' ? 'text-[#FF6B00]' : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <User className="w-5 h-5 mb-0.5" />
        <span>{user ? 'Orders' : 'Account'}</span>
      </button>
    </div>
  );
};
