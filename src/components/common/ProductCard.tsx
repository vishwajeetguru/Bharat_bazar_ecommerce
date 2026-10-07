import React, { useState } from 'react';
import { Heart, Star, ShoppingCart, Check, Zap } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const {
    addToCart,
    cart,
    updateCartQuantity,
    toggleWishlist,
    isInWishlist,
    setSelectedProductId,
    setCurrentView
  } = useStore();

  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants[0]?.label || 'Standard'
  );
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [justAdded, setJustAdded] = useState<boolean>(false);

  // Variant math
  const matchedVariant = product.variants.find(v => v.label === selectedVariant);
  const priceDelta = matchedVariant?.priceDelta || 0;
  const mrpDelta = matchedVariant?.mrpDelta || 0;
  const effectivePrice = Math.max(1, product.price + priceDelta);
  const effectiveMrp = Math.max(effectivePrice, product.mrp + mrpDelta);
  const calculatedDiscount = Math.round(
    ((effectiveMrp - effectivePrice) / effectiveMrp) * 100
  );

  // Cart item matching
  const itemId = `${product.id}-${selectedVariant}`;
  const cartItem = cart.find(item => item.id === itemId);
  const inWish = isInWishlist(product.id);

  const handleCardClick = () => {
    setSelectedProductId(product.id);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedVariant, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItem) {
      updateCartQuantity(itemId, cartItem.quantity + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItem) {
      updateCartQuantity(itemId, cartItem.quantity - 1);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleVariantClick = (e: React.MouseEvent, label: string) => {
    e.stopPropagation();
    setSelectedVariant(label);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      className="group bg-white rounded-xl border border-slate-200/80 hover:border-orange-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer relative"
    >
      {/* Top Badges & Image container */}
      <div className="relative w-full overflow-hidden bg-slate-50">
        {/* Top Badges row */}
        <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Discount Badge */}
            <span className="bg-[#FF6B00] text-white text-[11px] font-black px-2 py-0.5 rounded shadow-xs tracking-tight">
              {calculatedDiscount}% OFF
            </span>

            {/* Special Badge (Bestseller, Organic, Deal) */}
            {product.badge && (
              <span className="bg-[#0F2340] text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs uppercase tracking-wider">
                {product.badge}
              </span>
            )}

            {/* Indian Veg Icon */}
            {product.isVeg && (
              <div
                className="w-4 h-4 rounded-xs border border-emerald-600 bg-white flex items-center justify-center p-0.5"
                title="100% Vegetarian"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-600" />
              </div>
            )}
          </div>

          {/* Wishlist Heart Button */}
          <button
            onClick={handleToggleWishlist}
            className={`w-8 h-8 rounded-full flex items-center justify-center pointer-events-auto transition-transform active:scale-90 shadow-sm cursor-pointer ${
              inWish
                ? 'bg-rose-50 text-rose-500'
                : 'bg-white/90 text-slate-400 hover:text-rose-500 hover:bg-white'
            }`}
            title={inWish ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart
              className={`w-4 h-4 ${inWish ? 'fill-rose-500 text-rose-500' : ''}`}
            />
          </button>
        </div>

        {/* Product Image */}
        <ProductImage
          src={product.images[0]}
          secondarySrc={product.secondaryImage || product.images[1]}
          alt={product.name}
          category={product.category}
          isHovered={isHovered}
          aspectRatio="square"
          className="group-hover:scale-102 transition-transform duration-500"
        />

        {/* Stock / Deal Urgency bar */}
        {product.isDeal && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-[10px] font-bold px-2 py-0.5 flex items-center justify-between z-10">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 fill-amber-300 text-amber-300" />
              Limited Deal
            </span>
            <span>Ends in {product.dealEndsInHours || 6}h</span>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="p-3.5 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] truncate max-w-[120px]">
              {product.brand}
            </span>
            <span className="text-slate-600">{product.subcategory}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2 mt-1 leading-snug">
            {product.name}
          </h3>

          {/* Star Rating & Review Count */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center gap-1 bg-emerald-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              <span>{product.rating}</span>
              <Star className="w-2.5 h-2.5 fill-white text-white" />
            </div>
            <span className="text-[11px] text-slate-600 font-medium">
              ({product.reviewCount.toLocaleString('en-IN')})
            </span>
          </div>

          {/* Variants Selector */}
          {product.variants.length > 1 && (
            <div className="mt-2.5">
              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                <span>Select {product.variantType === 'weight' ? 'Weight' : 'Size'}:</span>
                <span className="font-semibold text-slate-700">{selectedVariant}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {product.variants.slice(0, 4).map(v => (
                  <button
                    key={v.id}
                    onClick={e => handleVariantClick(e, v.label)}
                    className={`text-[10px] font-medium px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                      selectedVariant === v.label
                        ? 'border-[#FF6B00] bg-orange-50 text-orange-950 font-bold shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pricing, Delivery & CTA */}
        <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
          {/* Price & MRP */}
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-base sm:text-lg font-extrabold text-slate-950 tabular-nums">
              ₹{effectivePrice.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-slate-600 line-through tabular-nums">
              ₹{effectiveMrp.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] font-bold text-emerald-700">
              Save ₹{(effectiveMrp - effectivePrice).toLocaleString('en-IN')}
            </span>
          </div>

          {/* Delivery Promise */}
          <p className="text-[11px] text-slate-600 flex items-center gap-1 font-medium">
            <span className="text-emerald-700 font-bold">Free Delivery</span>
            <span>· by {product.deliveryDays === 1 ? 'Tomorrow' : `${product.deliveryDays} Days`}</span>
          </p>

          {/* Add to Cart or Stepper */}
          <div className="mt-1">
            {cartItem ? (
              <div
                onClick={e => e.stopPropagation()}
                className="w-full flex items-center justify-between bg-orange-50 border border-orange-300 rounded-lg p-1 text-slate-800"
              >
                <button
                  onClick={handleDecrement}
                  className="w-8 h-7 rounded-md bg-white border border-orange-200 hover:bg-orange-100 font-bold text-sm flex items-center justify-center text-orange-900 transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="text-xs font-bold text-orange-950 tabular-nums">
                  {cartItem.quantity} in Bag
                </span>
                <button
                  onClick={handleIncrement}
                  className="w-8 h-7 rounded-md bg-[#FF6B00] hover:bg-[#E65A00] font-bold text-sm flex items-center justify-center text-white transition-colors cursor-pointer shadow-xs"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-xs cursor-pointer ${
                  product.stock === 0
                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    : justAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#FF6B00] hover:bg-[#E65A00] text-white active:scale-98'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
