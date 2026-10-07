import React, { useState, useMemo } from 'react';
import {
  Filter,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Star,
  RotateCcw,
  Check,
  ChevronDown,
  X,
  Search,
  ShoppingCart,
  Heart
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { CATEGORIES_DATA } from '../../data/products';
import { Product, FilterState } from '../../types';

export const ShopCatalog: React.FC = () => {
  const {
    products,
    filters,
    setFilters,
    resetFilters,
    setSelectedProductId,
    setCurrentView,
    addToCart,
    isInWishlist,
    toggleWishlist
  } = useStore();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Collect unique brands in current dataset
  const availableBrands = useMemo(() => {
    const brands = new Set<string>();
    products.forEach(p => {
      if (filters.category === 'All' || p.category === filters.category) {
        brands.add(p.brand);
      }
    });
    return Array.from(brands);
  }, [products, filters.category]);

  // Current category data
  const currentCatObj = CATEGORIES_DATA.find(c => c.id === filters.category);
  const subcategoriesList = currentCatObj ? ['All', ...currentCatObj.subcategories] : ['All'];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (filters.category !== 'All') {
      result = result.filter(p => p.category === filters.category);
    }

    // Subcategory filter
    if (filters.subcategory && filters.subcategory !== 'All') {
      result = result.filter(p => p.subcategory === filters.subcategory);
    }

    // Search query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Price range
    result = result.filter(p => p.price <= filters.maxPrice);

    // Rating
    if (filters.minRating > 0) {
      result = result.filter(p => p.rating >= filters.minRating);
    }

    // Discount
    if (filters.minDiscount > 0) {
      result = result.filter(p => p.discount >= filters.minDiscount);
    }

    // Veg Only
    if (filters.vegOnly) {
      result = result.filter(p => p.isVeg === true);
    }

    // In Stock Only
    if (filters.inStockOnly) {
      result = result.filter(p => p.stock > 0);
    }

    // Brands
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    // Sorting
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
        break;
      case 'popularity':
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [products, filters, selectedBrands]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleClearAll = () => {
    resetFilters();
    setSelectedBrands([]);
  };

  const activeFiltersCount =
    (filters.category !== 'All' ? 1 : 0) +
    (filters.subcategory !== 'All' ? 1 : 0) +
    (filters.searchQuery ? 1 : 0) +
    (filters.maxPrice < 15000 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.minDiscount > 0 ? 1 : 0) +
    (filters.vegOnly ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    selectedBrands.length;

  return (
    <div className="my-6 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Top Header: Breadcrumbs & Results Count */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
            <button
              onClick={() => {
                resetFilters();
                setCurrentView('home');
              }}
              className="hover:text-orange-600"
            >
              Home
            </button>
            <span>/</span>
            <span className="font-semibold text-slate-800">
              {filters.category === 'All' ? 'All Products' : filters.category}
            </span>
            {filters.subcategory !== 'All' && (
              <>
                <span>/</span>
                <span className="font-semibold text-orange-600">{filters.subcategory}</span>
              </>
            )}
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
            {filters.category === 'All' ? 'Complete Family Catalog' : filters.category}
            {filters.searchQuery && (
              <span className="text-slate-600 font-normal text-base ml-2">
                — Results for "{filters.searchQuery}"
              </span>
            )}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Showing <strong className="text-slate-800">{filteredProducts.length}</strong> items
          </p>
        </div>

        {/* Controls: Mobile Filter Button, Sort Dropdown, View Mode */}
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 shadow-xs cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5 text-orange-600" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-[#FF6B00] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs shadow-xs">
            <span className="text-slate-600 hidden md:inline">Sort by:</span>
            <select
              value={filters.sortBy}
              onChange={e =>
                setFilters(prev => ({
                  ...prev,
                  sortBy: e.target.value as FilterState['sortBy']
                }))
              }
              className="bg-transparent font-semibold text-slate-800 focus:outline-hidden cursor-pointer"
            >
              <option value="popularity">Popularity (Most Reviewed)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated (4.5+ ★)</option>
              <option value="newest">New Arrivals First</option>
            </select>
          </div>

          {/* Grid / List View Toggle */}
          <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-orange-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-orange-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Tags */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap mb-5">
          <span className="text-xs font-semibold text-slate-500">Active Filters:</span>
          {filters.category !== 'All' && (
            <span className="inline-flex items-center gap-1 text-xs bg-orange-100 text-orange-800 px-2.5 py-1 rounded-full font-medium">
              Category: {filters.category}
              <button
                onClick={() => setFilters(p => ({ ...p, category: 'All', subcategory: 'All' }))}
                className="hover:text-orange-950"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.subcategory !== 'All' && (
            <span className="inline-flex items-center gap-1 text-xs bg-orange-100 text-orange-800 px-2.5 py-1 rounded-full font-medium">
              Sub: {filters.subcategory}
              <button
                onClick={() => setFilters(p => ({ ...p, subcategory: 'All' }))}
                className="hover:text-orange-950"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.searchQuery && (
            <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-full font-medium">
              Query: "{filters.searchQuery}"
              <button
                onClick={() => setFilters(p => ({ ...p, searchQuery: '' }))}
                className="hover:text-slate-950"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.minDiscount > 0 && (
            <span className="inline-flex items-center gap-1 text-xs bg-red-100 text-red-800 px-2.5 py-1 rounded-full font-medium">
              {filters.minDiscount}%+ Discount
              <button
                onClick={() => setFilters(p => ({ ...p, minDiscount: 0 }))}
                className="hover:text-red-950"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.vegOnly && (
            <span className="inline-flex items-center gap-1 text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-medium">
              100% Veg
              <button
                onClick={() => setFilters(p => ({ ...p, vegOnly: false }))}
                className="hover:text-emerald-950"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedBrands.map(b => (
            <span
              key={b}
              className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full font-medium"
            >
              {b}
              <button onClick={() => toggleBrand(b)} className="hover:text-blue-950">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <button
            onClick={handleClearAll}
            className="text-xs text-orange-600 font-bold hover:underline ml-2 cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Layout: Sidebar Filters + Products Output */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* DESKTOP SIDEBAR FILTERS */}
        <aside className="hidden lg:block lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-6 sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-orange-600" />
              <span>Filters & Refinements</span>
            </h2>
            {activeFiltersCount > 0 && (
              <button
                onClick={handleClearAll}
                className="text-xs text-slate-500 hover:text-orange-600 font-medium cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>

          {/* 1. Category Tree */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
              Department
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => setFilters(p => ({ ...p, category: 'All', subcategory: 'All' }))}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex justify-between ${
                  filters.category === 'All'
                    ? 'bg-orange-50 text-orange-700 font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>All Departments</span>
                <span className="text-slate-600">{products.length}</span>
              </button>
              {CATEGORIES_DATA.map(c => {
                const count = products.filter(p => p.category === c.id).length;
                return (
                  <button
                    key={c.id}
                    onClick={() => setFilters(p => ({ ...p, category: c.id, subcategory: 'All' }))}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex justify-between ${
                      filters.category === c.id
                        ? 'bg-orange-50 text-orange-700 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{c.name}</span>
                    <span className="text-slate-600">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Sub-Category (if category selected) */}
          {filters.category !== 'All' && subcategoriesList.length > 1 && (
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Sub-Category
              </h3>
              <div className="space-y-1">
                {subcategoriesList.map(sub => (
                  <button
                    key={sub}
                    onClick={() => setFilters(p => ({ ...p, subcategory: sub }))}
                    className={`w-full text-left px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                      filters.subcategory === sub
                        ? 'text-orange-600 font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    • {sub}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. Price Range Slider */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Price Range
              </span>
              <span className="font-bold text-orange-600 tabular-nums">
                Up to ₹{filters.maxPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="15000"
              step="100"
              value={filters.maxPrice}
              onChange={e =>
                setFilters(p => ({ ...p, maxPrice: Number(e.target.value) }))
              }
              className="w-full accent-orange-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-600 mt-1">
              <span>₹100</span>
              <span>₹15,000+</span>
            </div>
          </div>

          {/* 4. Customer Rating */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Customer Rating
            </h3>
            <div className="space-y-1.5">
              {[4.5, 4.0, 3.5].map(rating => (
                <label
                  key={rating}
                  className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-orange-600"
                >
                  <input
                    type="radio"
                    name="minRating"
                    checked={filters.minRating === rating}
                    onChange={() => setFilters(p => ({ ...p, minRating: rating }))}
                    className="accent-orange-600"
                  />
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">{rating}★ & above</span>
                  </div>
                </label>
              ))}
              {filters.minRating > 0 && (
                <button
                  onClick={() => setFilters(p => ({ ...p, minRating: 0 }))}
                  className="text-[11px] text-orange-600 hover:underline pt-1"
                >
                  Clear Rating
                </button>
              )}
            </div>
          </div>

          {/* 5. Discount Percentage */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Discount
            </h3>
            <div className="space-y-1.5">
              {[50, 40, 30, 20].map(disc => (
                <label
                  key={disc}
                  className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-orange-600"
                >
                  <input
                    type="radio"
                    name="minDiscount"
                    checked={filters.minDiscount === disc}
                    onChange={() => setFilters(p => ({ ...p, minDiscount: disc }))}
                    className="accent-orange-600"
                  />
                  <span>{disc}% or more</span>
                </label>
              ))}
              {filters.minDiscount > 0 && (
                <button
                  onClick={() => setFilters(p => ({ ...p, minDiscount: 0 }))}
                  className="text-[11px] text-orange-600 hover:underline pt-1"
                >
                  Clear Discount
                </button>
              )}
            </div>
          </div>

          {/* 6. Special Tags: Veg Only, In Stock Only */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.vegOnly}
                onChange={e => setFilters(p => ({ ...p, vegOnly: e.target.checked }))}
                className="rounded-sm accent-emerald-600"
              />
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                100% Vegetarian Only
              </span>
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={e => setFilters(p => ({ ...p, inStockOnly: e.target.checked }))}
                className="rounded-sm accent-orange-600"
              />
              <span>In Stock Only</span>
            </label>
          </div>

          {/* 7. Brands filter */}
          {availableBrands.length > 0 && (
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Brand
              </h3>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {availableBrands.map(brand => (
                  <label
                    key={brand}
                    className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-slate-900"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="rounded-sm accent-orange-600"
                    />
                    <span className="truncate">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* PRODUCTS LISTING / GRID */}
        <main className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-5">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* LIST VIEW */
              <div className="space-y-4">
                {filteredProducts.map(product => {
                  const inWish = isInWishlist(product.id);
                  return (
                    <div
                      key={product.id}
                      onClick={() => {
                        setSelectedProductId(product.id);
                        setCurrentView('product-detail');
                      }}
                      className="group bg-white rounded-xl border border-slate-200/80 hover:border-orange-300 hover:shadow-md p-4 transition-all flex flex-col sm:flex-row gap-4 cursor-pointer"
                    >
                      {/* Image */}
                      <div className="w-full sm:w-44 h-44 rounded-lg overflow-hidden bg-slate-50 shrink-0 relative">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-2 left-2 bg-[#FF6B00] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                          {product.discount}% OFF
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                            <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                              {product.brand}
                            </span>
                            <span className="text-slate-600">{product.category}</span>
                          </div>

                          <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                            {product.name}
                          </h3>

                          {/* Star Rating */}
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <span className="bg-emerald-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                              {product.rating} <Star className="w-2.5 h-2.5 fill-white text-white" />
                            </span>
                            <span className="text-xs text-slate-600">
                              ({product.reviewCount} customer reviews)
                            </span>
                          </div>

                          {/* Highlights */}
                          <ul className="mt-2 text-xs text-slate-600 space-y-0.5 list-disc list-inside line-clamp-2">
                            {product.highlights.slice(0, 2).map((h, i) => (
                              <li key={i}>{h}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Price & Action Row */}
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                          <div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl font-extrabold text-slate-900">
                                ₹{product.price.toLocaleString('en-IN')}
                              </span>
                              <span className="text-xs text-slate-600 line-through">
                                ₹{product.mrp.toLocaleString('en-IN')}
                              </span>
                              <span className="text-xs font-bold text-emerald-700">
                                Save ₹{(product.mrp - product.price).toLocaleString('en-IN')}
                              </span>
                            </div>
                            <span className="text-[11px] text-emerald-700 font-medium">
                              Free Delivery by {product.deliveryDays === 1 ? 'Tomorrow' : '2 Days'}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                toggleWishlist(product.id);
                              }}
                              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                                inWish
                                  ? 'bg-rose-50 text-rose-500 border-rose-200'
                                  : 'border-slate-200 text-slate-400 hover:text-rose-500'
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${inWish ? 'fill-rose-500' : ''}`} />
                            </button>
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                addToCart(product);
                              }}
                              className="bg-[#FF6B00] hover:bg-[#E65A00] text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <ShoppingCart className="w-3.5 h-3.5" />
                              <span>Add to Cart</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            /* EMPTY RESULTS */
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs">
              <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-600 mx-auto flex items-center justify-center mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No matching products found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                We couldn't find any items matching your selected criteria. Try adjusting your
                filters or search query.
              </p>
              <button
                onClick={handleClearAll}
                className="mt-4 bg-[#0F2340] hover:bg-[#18345C] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/50 backdrop-blur-xs">
          <div className="bg-white w-4/5 max-w-sm h-full overflow-y-auto p-5 ml-auto flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <h3 className="text-base font-bold text-slate-900">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-md text-slate-500 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Department */}
              <div className="mb-4">
                <p className="text-xs font-bold text-slate-700 uppercase mb-2">Category</p>
                <select
                  value={filters.category}
                  onChange={e => setFilters(p => ({ ...p, category: e.target.value, subcategory: 'All' }))}
                  className="w-full text-xs p-2 border border-slate-200 rounded-lg"
                >
                  <option value="All">All Departments</option>
                  {CATEGORIES_DATA.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Slider */}
              <div className="mb-4">
                <p className="text-xs font-bold text-slate-700 uppercase mb-2">
                  Max Price: ₹{filters.maxPrice}
                </p>
                <input
                  type="range"
                  min="100"
                  max="15000"
                  step="200"
                  value={filters.maxPrice}
                  onChange={e => setFilters(p => ({ ...p, maxPrice: Number(e.target.value) }))}
                  className="w-full accent-orange-600"
                />
              </div>

              {/* Min Discount */}
              <div className="mb-4">
                <p className="text-xs font-bold text-slate-700 uppercase mb-2">Min Discount</p>
                <div className="grid grid-cols-2 gap-2">
                  {[20, 30, 40, 50].map(d => (
                    <button
                      key={d}
                      onClick={() => setFilters(p => ({ ...p, minDiscount: d }))}
                      className={`text-xs py-1.5 px-2 rounded-lg border ${
                        filters.minDiscount === d
                          ? 'bg-orange-50 border-orange-500 text-orange-700 font-bold'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      {d}%+ Off
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex gap-2">
              <button
                onClick={() => {
                  handleClearAll();
                  setIsMobileFilterOpen(false);
                }}
                className="w-1/2 py-2.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-700"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-1/2 py-2.5 bg-[#FF6B00] text-white rounded-lg text-xs font-bold"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
