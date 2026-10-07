import React, { useState } from 'react';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  Heart,
  ShoppingCart,
  Zap,
  CheckCircle2,
  ChevronRight,
  Info,
  Layers,
  MapPin,
  Ruler,
  Clock,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';

export const ProductDetails: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProductId,
    setCurrentView,
    addToCart,
    cart,
    isInWishlist,
    toggleWishlist,
    pincodeStatus,
    checkPincode,
    products
  } = useStore();

  if (!selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Product not found</h2>
        <button
          onClick={() => setCurrentView('shop')}
          className="mt-4 bg-[#FF6B00] text-white px-5 py-2 rounded-lg text-xs font-bold"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  // Active image in gallery
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedVariant, setSelectedVariant] = useState<string>(
    selectedProduct.variants[0]?.label || 'Standard'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [pincodeInput, setPincodeInput] = useState<string>(pincodeStatus.pincode || '110001');
  const [isSizeChartOpen, setIsSizeChartOpen] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  // Variant price math
  const matchedVariant = selectedProduct.variants.find(v => v.label === selectedVariant);
  const priceDelta = matchedVariant?.priceDelta || 0;
  const mrpDelta = matchedVariant?.mrpDelta || 0;
  const effectivePrice = Math.max(1, selectedProduct.price + priceDelta);
  const effectiveMrp = Math.max(effectivePrice, selectedProduct.mrp + mrpDelta);
  const savings = effectiveMrp - effectivePrice;
  const discountPercent = Math.round((savings / effectiveMrp) * 100);

  const inWish = isInWishlist(selectedProduct.id);

  // All images
  const allImages = [
    selectedProduct.images[0],
    selectedProduct.secondaryImage || selectedProduct.images[1] || selectedProduct.images[0],
    ...(selectedProduct.images.slice(2))
  ].filter(Boolean);

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkPincode(pincodeInput);
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedVariant, quantity);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, selectedVariant, quantity);
    setCurrentView('checkout');
  };

  // Related products
  const relatedProducts = products
    .filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Back button & Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <button
          onClick={() => setCurrentView('shop')}
          className="flex items-center gap-1 font-semibold text-slate-700 hover:text-orange-600 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalog</span>
        </button>
        <span>/</span>
        <span className="text-slate-600">{selectedProduct.category}</span>
        <span>/</span>
        <span className="text-slate-600">{selectedProduct.subcategory}</span>
        <span>/</span>
        <span className="font-semibold text-slate-900 truncate max-w-[200px]">
          {selectedProduct.name}
        </span>
      </div>

      {/* Main Grid: Gallery on Left, Details on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* LEFT: IMAGE GALLERY */}
        <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4 sticky top-24">
          {/* Thumbnails row/column */}
          <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto no-scrollbar shrink-0">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                  activeImageIndex === idx
                    ? 'border-[#FF6B00] shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>

          {/* Main Large Image Frame */}
          <div
            className="flex-1 relative rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-xs group cursor-crosshair min-h-[380px] sm:min-h-[460px] flex items-center justify-center"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            {/* Top Badges */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
              <span className="bg-[#FF6B00] text-white text-xs font-black px-2.5 py-1 rounded shadow-xs">
                {discountPercent}% OFF
              </span>
              {selectedProduct.badge && (
                <span className="bg-[#0F2340] text-amber-300 text-xs font-bold px-2 py-1 rounded shadow-xs uppercase">
                  {selectedProduct.badge}
                </span>
              )}
              {selectedProduct.isVeg && (
                <div
                  className="w-5 h-5 rounded-xs border-2 border-emerald-600 bg-white flex items-center justify-center p-0.5"
                  title="100% Vegetarian Certified"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                </div>
              )}
            </div>

            {/* Wishlist Heart */}
            <button
              onClick={() => toggleWishlist(selectedProduct.id)}
              className={`absolute top-3 right-3 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer ${
                inWish
                  ? 'bg-rose-50 text-rose-500'
                  : 'bg-white/90 text-slate-400 hover:text-rose-500 hover:bg-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${inWish ? 'fill-rose-500' : ''}`} />
            </button>

            {/* Main Image */}
            <img
              src={allImages[activeImageIndex] || allImages[0]}
              alt={selectedProduct.name}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover max-h-[520px] transition-transform duration-500 ${
                isZoomed ? 'scale-125' : 'scale-100'
              }`}
            />
          </div>
        </div>

        {/* RIGHT: PURCHASE MODULE & PRODUCT INFORMATION */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          {/* Brand & Title */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">
                {selectedProduct.brand}
              </span>
              <span className="text-xs text-slate-600">SKU: {selectedProduct.id}</span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 font-display mt-1 leading-snug">
              {selectedProduct.name}
            </h1>

            {/* Rating Stars & Review Count */}
            <div className="flex items-center gap-3 mt-2.5">
              <div className="flex items-center gap-1 bg-emerald-700 text-white text-xs font-bold px-2 py-0.5 rounded">
                <span>{selectedProduct.rating}</span>
                <Star className="w-3 h-3 fill-white text-white" />
              </div>
              <span className="text-xs text-slate-600 font-medium">
                {selectedProduct.reviewCount.toLocaleString('en-IN')} Verified Customer Ratings
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-xs text-emerald-800 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Bharat Verified
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl font-black text-slate-950 tabular-nums">
                ₹{effectivePrice.toLocaleString('en-IN')}
              </span>
              <span className="text-base text-slate-600 line-through tabular-nums">
                ₹{effectiveMrp.toLocaleString('en-IN')}
              </span>
              <span className="text-sm font-extrabold text-emerald-700">
                Save ₹{savings.toLocaleString('en-IN')} ({discountPercent}% off)
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1">
              Inclusive of all taxes · Free shipping on orders over ₹499
            </p>
          </div>

          {/* Special Bank Offers Box */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5">
            <h3 className="text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <CreditCard className="w-4 h-4 text-amber-700" />
              <span>Available Offers & Promotions</span>
            </h3>
            <ul className="text-xs text-amber-950 space-y-1.5">
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-orange-600 shrink-0">• Bank Offer:</span>
                <span>10% Instant Discount up to ₹500 on SBI & HDFC Credit Cards.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-orange-600 shrink-0">• Coupon:</span>
                <span>Use code <strong className="font-mono text-slate-900 bg-amber-100 px-1 rounded">BHARAT50</strong> for extra ₹50 off.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-orange-600 shrink-0">• No-Cost EMI:</span>
                <span>Starting from ₹{(effectivePrice / 3).toFixed(0)}/month on major banks.</span>
              </li>
            </ul>
          </div>

          {/* Variants Selector */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-slate-800">
                Select {selectedProduct.variantType === 'weight' ? 'Package Weight' : 'Size / Variant'}:
              </span>
              {selectedProduct.category === 'Fashion' && (
                <button
                  onClick={() => setIsSizeChartOpen(true)}
                  className="text-orange-600 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Chart</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedProduct.variants.map(v => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v.label)}
                  className={`py-2 px-3.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    selectedVariant === v.label
                      ? 'border-[#FF6B00] bg-orange-50 text-orange-950 shadow-xs ring-1 ring-[#FF6B00]'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {v.label}
                  {v.priceDelta && v.priceDelta > 0 ? (
                    <span className="text-[10px] text-slate-600 block font-normal">
                      (+₹{v.priceDelta})
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          </div>

          {/* Pincode Checker */}
          <div className="border border-slate-200 rounded-xl p-3.5 bg-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-orange-600" />
                <span>Delivery & Service Availability</span>
              </span>
              {pincodeStatus.status === 'valid' && (
                <span className="text-xs text-emerald-800 font-bold">
                  ✓ Serviceable
                </span>
              )}
            </div>

            <form onSubmit={handlePincodeSubmit} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincodeInput}
                onChange={e => setPincodeInput(e.target.value)}
                placeholder="Enter 6-digit Pincode"
                className="flex-1 py-1.5 px-3 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-orange-500 font-mono"
              />
              <button
                type="submit"
                className="bg-[#0F2340] hover:bg-[#18345C] text-white px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer"
              >
                Check
              </button>
            </form>

            {pincodeStatus.status === 'valid' ? (
              <div className="mt-2.5 text-xs text-slate-600 space-y-0.5">
                <p className="font-semibold text-emerald-800">
                  ⚡ Expected Delivery by{' '}
                  {selectedProduct.deliveryDays === 1 ? 'Tomorrow, 8 PM' : '2 Business Days'}
                </p>
                <p className="text-[11px] text-slate-600">
                  Delivering to: <strong className="text-slate-700">{pincodeStatus.city}</strong> ({pincodeStatus.pincode})
                </p>
                <p className="text-[11px] text-slate-600">
                  Cash on Delivery available · 7 Days Replacement
                </p>
              </div>
            ) : pincodeStatus.status === 'invalid' ? (
              <p className="text-xs text-rose-600 mt-2">
                Please enter a valid 6-digit Indian PIN code.
              </p>
            ) : null}
          </div>

          {/* Quantity Selector & CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            {/* Quantity */}
            <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden shrink-0 self-start sm:self-auto">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2.5 text-slate-600 hover:bg-slate-100 font-bold text-sm cursor-pointer"
              >
                -
              </button>
              <span className="px-3 py-2.5 text-xs font-bold text-slate-800 tabular-nums min-w-[36px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2.5 text-slate-600 hover:bg-slate-100 font-bold text-sm cursor-pointer"
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#FF6B00] hover:bg-[#E65A00] text-white py-3 px-5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>

            {/* Buy Now */}
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-[#0F2340] hover:bg-[#18345C] text-white py-3 px-5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
              <span>Buy Now</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200 text-center">
            <div className="p-2.5 bg-slate-50 rounded-xl flex flex-col items-center justify-center">
              <RotateCcw className="w-4 h-4 text-orange-600 mb-1" />
              <span className="text-[11px] font-bold text-slate-800">7 Days Return</span>
              <span className="text-[10px] text-slate-600">Hassle-free pick</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl flex flex-col items-center justify-center">
              <Truck className="w-4 h-4 text-emerald-600 mb-1" />
              <span className="text-[11px] font-bold text-slate-800">Free Shipping</span>
              <span className="text-[10px] text-slate-600">On orders ₹499+</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl flex flex-col items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-blue-600 mb-1" />
              <span className="text-[11px] font-bold text-slate-800">100% Genuine</span>
              <span className="text-[10px] text-slate-600">Quality Assured</span>
            </div>
          </div>
        </div>
      </div>

      {/* DOMAIN SPECIFIC SPECIFICATIONS & DETAILS */}
      <div className="mt-12 pt-8 border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Description & Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Product Overview</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedProduct.description}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">Key Highlights</h3>
              <ul className="space-y-2">
                {selectedProduct.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* If Grocery & Masala -> Show FSSAI, Ingredients, Expiry */}
            {selectedProduct.groceryInfo && (
              <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-amber-950 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                    Food Safety & Purity Credentials
                  </h3>
                  <span className="text-[11px] font-mono bg-white px-2 py-0.5 rounded border border-amber-300 font-bold text-amber-900">
                    FSSAI Lic No: {selectedProduct.groceryInfo.fssaiLicense}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Shelf Life:</span>
                    <strong className="text-slate-800">{selectedProduct.groceryInfo.shelfLife}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">State of Origin:</span>
                    <strong className="text-slate-800">{selectedProduct.groceryInfo.originState}</strong>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Ingredients:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProduct.groceryInfo.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="bg-white text-slate-700 text-xs px-2 py-0.5 rounded border border-amber-200 font-medium"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* If Clothing -> Fabric, Fit, Care, Return Policy */}
            {selectedProduct.fashionInfo && (
              <div className="p-4 bg-orange-50/40 border border-orange-200 rounded-xl space-y-3">
                <h3 className="text-sm font-bold text-orange-950">
                  Fabric & Garment Specifications
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Fabric:</span>
                    <strong className="text-slate-800">{selectedProduct.fashionInfo.fabric}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Fit Silhouette:</span>
                    <strong className="text-slate-800">{selectedProduct.fashionInfo.fit}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Wash Care:</span>
                    <strong className="text-slate-800">{selectedProduct.fashionInfo.care}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Returns:</span>
                    <strong className="text-slate-800">{selectedProduct.fashionInfo.returnPolicy}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Technical Specifications Table */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                Detailed Technical Specifications
              </h3>
              <table className="w-full text-xs">
                <tbody className="divide-y divide-slate-100">
                  {Object.entries(selectedProduct.specifications).map(([key, val]) => (
                    <tr key={key} className="py-2">
                      <td className="py-2 text-slate-500 font-medium w-2/5">{key}</td>
                      <td className="py-2 text-slate-900 font-semibold w-3/5">{val}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="py-2 text-slate-500 font-medium">Country of Origin</td>
                    <td className="py-2 text-slate-900 font-semibold">India</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-slate-500 font-medium">Standard Warranty</td>
                    <td className="py-2 text-slate-900 font-semibold">Seller & Brand Assurance</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="mt-14 pt-8 border-t border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 font-display mb-4">
            Customers Also Viewed in {selectedProduct.category}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* SIZE CHART MODAL */}
      {isSizeChartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Ruler className="w-5 h-5 text-orange-600" />
                <span>Size Chart & Fit Guide</span>
              </h3>
              <button
                onClick={() => setIsSizeChartOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              All measurements are in inches. For a relaxed fit, pick one size larger.
            </p>

            <table className="w-full text-xs text-left border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 font-bold text-slate-800">
                <tr>
                  <th className="p-2.5">Size</th>
                  <th className="p-2.5">Chest</th>
                  <th className="p-2.5">Waist</th>
                  <th className="p-2.5">Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-2.5 font-bold">S (38)</td>
                  <td className="p-2.5">38"</td>
                  <td className="p-2.5">34"</td>
                  <td className="p-2.5">28"</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">M (40)</td>
                  <td className="p-2.5">40"</td>
                  <td className="p-2.5">36"</td>
                  <td className="p-2.5">29"</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">L (42)</td>
                  <td className="p-2.5">42"</td>
                  <td className="p-2.5">38"</td>
                  <td className="p-2.5">30"</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">XL (44)</td>
                  <td className="p-2.5">44"</td>
                  <td className="p-2.5">40"</td>
                  <td className="p-2.5">31"</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">XXL (46)</td>
                  <td className="p-2.5">46"</td>
                  <td className="p-2.5">42"</td>
                  <td className="p-2.5">32"</td>
                </tr>
              </tbody>
            </table>

            <button
              onClick={() => setIsSizeChartOpen(false)}
              className="mt-6 w-full bg-[#0F2340] text-white py-2 rounded-lg text-xs font-bold"
            >
              Close Size Guide
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
