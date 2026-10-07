import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingCart,
  Heart,
  User as UserIcon,
  PhoneCall,
  Truck,
  Globe,
  ChevronDown,
  Menu,
  X,
  Flame,
  ShieldCheck,
  Package,
  Layers,
  Sparkles
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES_DATA } from '../../data/products';

export const Header: React.FC = () => {
  const {
    cartCount,
    cartSubtotal,
    wishlist,
    user,
    setIsCartOpen,
    setIsAuthModalOpen,
    setIsTrackOrderModalOpen,
    currentView,
    setCurrentView,
    filters,
    setFilters,
    navigateToCategory,
    language,
    setLanguage,
    products,
    setSelectedProductId
  } = useStore();

  const [searchCategory, setSearchCategory] = useState<string>('All');
  const [searchInput, setSearchInput] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState<boolean>(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setFilters(prev => ({
      ...prev,
      category: searchCategory,
      searchQuery: searchInput.trim()
    }));
    setCurrentView('shop');
    setIsSearchFocused(false);
  };

  // Instant suggestions matching products
  const matchingSuggestions = searchInput.trim()
    ? products
        .filter(p => {
          const matchCat = searchCategory === 'All' || p.category === searchCategory;
          const matchText =
            p.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchInput.toLowerCase()) ||
            p.subcategory.toLowerCase().includes(searchInput.toLowerCase());
          return matchCat && matchText;
        })
        .slice(0, 5)
    : [];

  const handleSelectSuggestion = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product-detail');
    setIsSearchFocused(false);
    setSearchInput('');
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs">
      {/* 1. TOP BAR */}
      <div className="bg-[#0F2340] text-slate-200 text-xs py-1.5 px-4 sm:px-8 border-b border-[#18345C]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Helpline & Trust */}
          <div className="flex items-center gap-4">
            <a
              href="tel:18002004567"
              className="flex items-center gap-1.5 hover:text-orange-400 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
              <span>Helpline: <strong className="font-semibold text-white">1800-200-4567</strong></span>
            </a>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Genuine Products · Free Delivery on ₹499+
            </span>
          </div>

          {/* Right: Track Order, Language, Admin */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsTrackOrderModalOpen(true)}
              className="flex items-center gap-1 hover:text-orange-400 transition-colors cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5 text-orange-400" />
              <span>Track Order</span>
            </button>

            <span className="text-slate-500">|</span>

            {/* Language toggle */}
            <div className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="hover:text-orange-400 transition-colors font-medium flex items-center gap-1 cursor-pointer"
              >
                <span>{language === 'en' ? 'English' : 'हिन्दी'}</span>
                <span className="text-[10px] bg-slate-700 text-orange-300 px-1 rounded">
                  {language === 'en' ? 'HI' : 'EN'}
                </span>
              </button>
            </div>

            <span className="text-slate-500">|</span>

            {/* Quick Admin Access */}
            <button
              onClick={() => setCurrentView('admin')}
              className={`hover:text-orange-400 transition-colors flex items-center gap-1 cursor-pointer ${
                currentView === 'admin' ? 'text-orange-400 font-semibold' : 'text-slate-400'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <div className="bg-white py-3 px-4 sm:px-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-700 hover:text-orange-600 rounded-md"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <button
              onClick={() => {
                setCurrentView('home');
                setFilters(prev => ({ ...prev, category: 'All', searchQuery: '' }));
              }}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B00] to-amber-600 flex items-center justify-center text-white shadow-sm shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <span className="font-extrabold text-xl tracking-tighter">B</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-2xl tracking-tight text-[#0F2340] font-display">
                    Bharat<span className="text-[#FF6B00]">Bazaar</span>
                  </span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mb-2" />
                </div>
                <span className="text-[11px] font-medium text-slate-500 -mt-1 hidden sm:block">
                  A Complete Family Store
                </span>
              </div>
            </button>
          </div>

          {/* BIG Search Bar */}
          <div ref={searchRef} className="flex-1 max-w-2xl hidden md:block relative">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center rounded-lg border-2 border-[#0F2340] focus-within:border-[#FF6B00] overflow-hidden bg-white shadow-xs transition-colors"
            >
              {/* Category Dropdown */}
              <div className="relative border-r border-slate-200 bg-slate-50 shrink-0">
                <select
                  value={searchCategory}
                  onChange={e => setSearchCategory(e.target.value)}
                  className="appearance-none bg-transparent py-2.5 pl-3 pr-7 text-xs font-semibold text-slate-700 focus:outline-hidden cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  {CATEGORIES_DATA.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Input */}
              <input
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder={
                  language === 'hi'
                    ? 'सर्च करें: साड़ी, गरम मसाला, फेस वॉश, टी-शर्ट...'
                    : 'Search 10,000+ products (e.g., Banarasi Saree, Garam Masala, T-Shirt)...'
                }
                className="w-full py-2.5 px-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden"
              />

              {/* Submit button */}
              <button
                type="submit"
                className="bg-[#FF6B00] hover:bg-[#E65A00] text-white px-5 py-2.5 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                title="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>

            {/* Search Suggestions Dropdown */}
            {isSearchFocused && matchingSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50">
                <div className="p-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                  <span>Suggested Products</span>
                  <span className="text-[10px] text-slate-600">Press enter to see all results</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                  {matchingSuggestions.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleSelectSuggestion(item.id)}
                      className="w-full text-left p-3 hover:bg-orange-50/50 flex items-center gap-3 transition-colors cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-md bg-slate-100 overflow-hidden shrink-0">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-800 truncate">{item.name}</p>
                        <p className="text-[11px] text-slate-500">
                          {item.brand} · <span className="text-orange-600 font-semibold">₹{item.price}</span>
                          <span className="line-through text-slate-600 ml-1">₹{item.mrp}</span>
                        </p>
                      </div>
                      <span className="text-[11px] text-orange-600 bg-orange-50 px-2 py-0.5 rounded font-medium shrink-0">
                        {item.discount}% off
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Actions: Login/Account, Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* User Account */}
            <div ref={userMenuRef} className="relative">
              {user ? (
                <div>
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer text-left"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#0F2340] text-white flex items-center justify-center font-semibold text-xs">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="hidden lg:block text-left">
                      <p className="text-[11px] text-slate-500 leading-none">Hello,</p>
                      <p className="text-xs font-bold text-slate-800 truncate max-w-[100px] leading-tight">
                        {user.name.split(' ')[0]}
                      </p>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:block" />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900">{user.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{user.email || user.phone}</p>
                        {user.role === 'admin' && (
                          <span className="inline-block mt-1 text-[10px] font-semibold bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded">
                            Store Admin
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          setCurrentView('orders');
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-orange-50 flex items-center gap-2.5 cursor-pointer"
                      >
                        <Package className="w-4 h-4 text-orange-600" />
                        My Orders
                      </button>

                      <button
                        onClick={() => {
                          setCurrentView('wishlist');
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-orange-50 flex items-center gap-2.5 cursor-pointer"
                      >
                        <Heart className="w-4 h-4 text-rose-500" />
                        My Wishlist ({wishlist.length})
                      </button>

                      <button
                        onClick={() => {
                          setCurrentView('admin');
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-orange-50 flex items-center gap-2.5 cursor-pointer"
                      >
                        <Layers className="w-4 h-4 text-indigo-600" />
                        Admin Dashboard
                      </button>

                      <div className="border-t border-slate-100 mt-1 pt-1">
                        <button
                          onClick={() => {
                            useStore().logout();
                            setIsUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 cursor-pointer"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 rounded-lg hover:bg-slate-100 text-slate-700 font-medium text-xs cursor-pointer"
                >
                  <UserIcon className="w-5 h-5 text-slate-600" />
                  <div className="hidden sm:block text-left">
                    <span className="block text-[10px] text-slate-500 leading-none">Sign In / Join</span>
                    <span className="font-bold text-slate-800">My Account</span>
                  </div>
                </button>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={() => setCurrentView('wishlist')}
              className="relative p-2 sm:px-3 sm:py-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
              title="View Wishlist"
            >
              <div className="relative">
                <Heart className="w-5 h-5 text-slate-700" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline text-xs font-semibold text-slate-700">Wishlist</span>
            </button>

            {/* Cart with count & preview */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-[#0F2340] hover:bg-[#18345C] text-white p-2 sm:px-4 sm:py-2 rounded-lg transition-colors flex items-center gap-2.5 shadow-xs cursor-pointer"
              title="Shopping Bag"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-orange-400" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-[#FF6B00] text-white text-[10px] font-extrabold rounded-full px-1.5 min-w-[18px] h-[18px] flex items-center justify-center border-2 border-[#0F2340]">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] text-slate-300 uppercase leading-none font-medium">Cart</span>
                <span className="text-xs font-bold text-white tabular-nums leading-tight">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="flex rounded-lg border border-slate-300 overflow-hidden">
            <input
              type="text"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search products, brands and masalas..."
              className="w-full py-2 px-3 text-sm focus:outline-hidden"
            />
            <button
              type="submit"
              className="bg-[#FF6B00] text-white px-4 flex items-center justify-center"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* 3. CATEGORY NAVIGATION BAR */}
      <div className="bg-[#FAF5EE] border-b border-amber-200/60 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-1.5">
            {/* All Categories Dropdown trigger */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0F2340] text-white text-xs font-bold hover:bg-[#18345C] transition-colors cursor-pointer mr-2 shrink-0"
              >
                <Menu className="w-4 h-4" />
                <span>All Categories</span>
                <ChevronDown className="w-3 h-3 ml-0.5" />
              </button>

              {/* All Categories Flyout */}
              {isCategoryMenuOpen && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 p-2 z-50">
                  <p className="px-3 py-1.5 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    Store Departments
                  </p>
                  {CATEGORIES_DATA.map(c => (
                    <button
                      key={c.id}
                      onClick={() => {
                        navigateToCategory(c.id);
                        setIsCategoryMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-orange-50 text-xs font-semibold text-slate-800 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span>{language === 'hi' ? c.hindiName : c.name}</span>
                      <span className="text-[10px] text-orange-600 font-medium">{c.count}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Category Quick Links */}
            {CATEGORIES_DATA.map(cat => (
              <button
                key={cat.id}
                onClick={() => navigateToCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  filters.category === cat.id && currentView === 'shop'
                    ? 'bg-[#FF6B00] text-white shadow-xs'
                    : 'text-slate-800 hover:text-[#FF6B00] hover:bg-amber-100/50'
                }`}
              >
                {language === 'hi' ? cat.hindiName : cat.name}
              </button>
            ))}
          </div>

          {/* Today's Deals quick badge */}
          <button
            onClick={() => {
              setFilters(prev => ({ ...prev, category: 'All', minDiscount: 35, searchQuery: '' }));
              setCurrentView('shop');
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-orange-700 bg-orange-100 hover:bg-orange-200 px-3 py-1.5 rounded-full transition-colors shrink-0 cursor-pointer ml-2"
          >
            <Flame className="w-3.5 h-3.5 text-orange-600 fill-orange-500 animate-bounce" />
            <span>Today's Flash Deals</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (when menu open) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 shadow-lg max-h-[80vh] overflow-y-auto">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Categories</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {CATEGORIES_DATA.map(c => (
              <button
                key={c.id}
                onClick={() => {
                  navigateToCategory(c.id);
                  setIsMobileMenuOpen(false);
                }}
                className="text-left p-2.5 rounded-lg bg-slate-50 hover:bg-orange-50 text-xs font-medium text-slate-800 border border-slate-100"
              >
                {language === 'hi' ? c.hindiName : c.name}
              </button>
            ))}
          </div>
          <div className="border-t border-slate-100 pt-3 flex flex-col gap-2">
            <button
              onClick={() => {
                setCurrentView('orders');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-xs font-medium text-slate-700 py-1.5 flex items-center gap-2"
            >
              <Package className="w-4 h-4 text-orange-600" />
              My Orders & Receipts
            </button>
            <button
              onClick={() => {
                setIsTrackOrderModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-xs font-medium text-slate-700 py-1.5 flex items-center gap-2"
            >
              <Truck className="w-4 h-4 text-emerald-600" />
              Track Package
            </button>
            <button
              onClick={() => {
                setCurrentView('admin');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-xs font-medium text-indigo-700 py-1.5 flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-indigo-600" />
              Admin Management Console
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
