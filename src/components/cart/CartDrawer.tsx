import React, { useState } from 'react';
import {
  X,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  Sparkles,
  Truck
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartSubtotal,
    cartMrpTotal,
    cartSavings,
    couponCode,
    couponDiscount,
    couponError,
    applyCoupon,
    removeCoupon,
    setCurrentView
  } = useStore();

  const [couponInput, setCouponInput] = useState<string>('');

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 499;
  const deliveryFee = cartSubtotal >= freeDeliveryThreshold ? 0 : 49;
  const amountNeededForFree = Math.max(0, freeDeliveryThreshold - cartSubtotal);
  const freeDeliveryProgress = Math.min(100, (cartSubtotal / freeDeliveryThreshold) * 100);

  const finalPayable = Math.max(0, cartSubtotal - couponDiscount + deliveryFee);

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = codeToApply || couponInput;
    if (applyCoupon(code)) {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* 1. Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FF6B00] text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900">Your Shopping Bag</h2>
                <p className="text-[11px] text-slate-500">
                  {cartCount} item{cartCount === 1 ? '' : 's'} selected
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. Free Delivery Bar */}
          <div className="px-4 py-2.5 bg-amber-50 border-b border-amber-200/60">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 font-semibold text-amber-950">
                <Truck className="w-3.5 h-3.5 text-orange-600" />
                {amountNeededForFree === 0 ? (
                  <strong className="text-emerald-700 font-bold">
                    You unlocked FREE Express Delivery!
                  </strong>
                ) : (
                  <span>
                    Add <strong className="text-orange-700 font-bold">₹{amountNeededForFree}</strong> more for FREE delivery
                  </span>
                )}
              </span>
              <span className="text-[11px] font-mono font-bold text-amber-900">
                {Math.round(freeDeliveryProgress)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-amber-200/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>

          {/* 3. Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 divide-y divide-slate-100">
            {cart.length > 0 ? (
              cart.map(item => (
                <div key={item.id} className="pt-3.5 first:pt-0 flex gap-3.5 items-start">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-slate-50 border border-slate-200 overflow-hidden shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug">
                        {item.product.name}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        Variant: {item.selectedVariant}
                      </span>
                    </div>

                    {/* Price and Stepper */}
                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-extrabold text-slate-900 tabular-nums">
                          ₹{(item.effectivePrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-slate-400 line-through tabular-nums">
                          ₹{(item.effectiveMrp * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold text-xs cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-7 h-6 flex items-center justify-center text-xs font-bold text-slate-800 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold text-xs cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              /* Empty Bag State */
              <div className="h-full flex flex-col items-center justify-center text-center p-6 my-12">
                <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-3">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Your bag is empty</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Discover trending ethnic fashion, pure farm spices, and daily staples right now.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentView('shop');
                  }}
                  className="mt-4 bg-[#FF6B00] hover:bg-[#E65A00] text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>

          {/* 4. Footer & Bill Section (only if items present) */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/80 space-y-3.5">
              {/* Coupon Code Accordion / Input */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                {couponCode ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg p-2 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Coupon '{couponCode}' Applied (-₹{couponDiscount})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-600 font-semibold hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={e => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Enter Promo Code (BHARAT50)"
                        className="flex-1 py-1.5 px-3 text-xs border border-slate-300 rounded-lg font-mono focus:outline-hidden focus:border-orange-500"
                      />
                      <button
                        onClick={() => handleApplyCoupon()}
                        className="bg-[#0F2340] hover:bg-[#18345C] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>

                    {/* Quick coupon chips */}
                    <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] text-slate-600">Quick Coupons:</span>
                      {['BHARAT50', 'FESTIVE100', 'FIRSTBUY'].map(c => (
                        <button
                          key={c}
                          onClick={() => handleApplyCoupon(c)}
                          className="text-[10px] bg-orange-50 hover:bg-orange-100 text-orange-950 px-2 py-0.5 rounded border border-orange-200 font-mono font-bold cursor-pointer"
                        >
                          {c}
                        </button>
                      ))}
                    </div>

                    {couponError && (
                      <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Total MRP</span>
                  <span className="line-through tabular-nums">
                    ₹{cartMrpTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Product Discount</span>
                  <span className="tabular-nums">-₹{cartSavings.toLocaleString('en-IN')}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon Savings</span>
                    <span className="tabular-nums">-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Delivery Charges</span>
                  <span className="tabular-nums">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase text-[11px]">
                        FREE
                      </span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline font-bold text-slate-900 text-sm">
                  <span>Total Amount</span>
                  <span className="text-lg font-black text-slate-950 tabular-nums">
                    ₹{finalPayable.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-[#FF6B00] hover:bg-[#E65A00] text-white py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-600 font-medium text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Safe & Secure UPI, Cards and Cash on Delivery</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
