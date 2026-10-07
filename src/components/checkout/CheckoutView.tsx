import React, { useState } from 'react';
import {
  MapPin,
  CheckCircle2,
  Plus,
  ShieldCheck,
  CreditCard,
  QrCode,
  Banknote,
  Building,
  ArrowRight,
  Package,
  Sparkles,
  Truck,
  Check,
  ArrowLeft
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Address, Order } from '../../types';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartMrpTotal,
    cartSavings,
    couponCode,
    couponDiscount,
    addresses,
    addAddress,
    selectedAddressId,
    setSelectedAddressId,
    placeOrder,
    setCurrentView,
    setIsTrackOrderModalOpen,
    setTrackingOrderNumber
  } = useStore();

  const [activeStep, setActiveStep] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'COD' | 'Card' | 'NetBanking'>('UPI');
  const [upiOption, setUpiOption] = useState<'qr' | 'id'>('qr');
  const [upiId, setUpiId] = useState<string>('sharma.priya@oksbi');
  const [selectedBank, setSelectedBank] = useState<string>('SBI');
  const [isAddingNewAddress, setIsAddingNewAddress] = useState<boolean>(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // New address form state
  const [newAddr, setNewAddr] = useState({
    name: 'Priya Sharma',
    phone: '+91 98765 43210',
    pincode: '110001',
    addressLine: '',
    locality: '',
    city: 'New Delhi',
    state: 'Delhi',
    type: 'Home' as 'Home' | 'Work'
  });

  const freeDeliveryThreshold = 499;
  const deliveryFee = cartSubtotal >= freeDeliveryThreshold ? 0 : 49;
  const finalTotal = Math.max(0, cartSubtotal - couponDiscount + deliveryFee);

  const selectedAddress =
    addresses.find(a => a.id === selectedAddressId) || addresses[0];

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.addressLine || !newAddr.pincode) return;
    const created = addAddress({
      ...newAddr,
      isDefault: false
    });
    setSelectedAddressId(created.id);
    setIsAddingNewAddress(false);
  };

  const handleCompleteOrder = () => {
    if (!selectedAddress) return;
    const order = placeOrder(selectedAddress, paymentMethod);
    setPlacedOrder(order);
    setTrackingOrderNumber(order.orderNumber);
    setActiveStep(4); // Placed confirmation
  };

  // If cart is empty and no placed order
  if (cart.length === 0 && !placedOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-600 mx-auto flex items-center justify-center mb-4">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Your bag is currently empty</h2>
        <p className="text-xs text-slate-500 mt-1">Please add items to your cart before proceeding to checkout.</p>
        <button
          onClick={() => setCurrentView('shop')}
          className="mt-5 bg-[#FF6B00] hover:bg-[#E65A00] text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          Browse Products
        </button>
      </div>
    );
  }

  // 4. ORDER CONFIRMED VIEW
  if (placedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-10 shadow-lg text-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center mb-5 animate-bounce">
            <Check className="w-10 h-10 stroke-[3]" />
          </div>

          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Order Confirmed Successfully!
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
            Thank you for your purchase!
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Order Reference:{' '}
            <strong className="font-mono text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
              {placedOrder.orderNumber}
            </strong>
          </p>

          {/* Delivery & Tracking card */}
          <div className="mt-6 p-4 sm:p-5 bg-slate-50 rounded-xl border border-slate-200 text-left space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-orange-600" />
                <span>Estimated Delivery</span>
              </span>
              <span className="text-xs font-bold text-emerald-700">
                {placedOrder.expectedDelivery}
              </span>
            </div>

            <div className="text-xs text-slate-600 border-t border-slate-200 pt-3">
              <p className="font-bold text-slate-800">Delivering to:</p>
              <p className="font-medium">{placedOrder.address.name}</p>
              <p>{placedOrder.address.addressLine}, {placedOrder.address.city} - {placedOrder.address.pincode}</p>
              <p className="text-slate-500 mt-0.5">Contact: {placedOrder.address.phone}</p>
            </div>

            <div className="flex items-center justify-between text-xs border-t border-slate-200 pt-3">
              <span className="text-slate-500">Payment:</span>
              <span className="font-bold text-slate-800">
                {placedOrder.paymentMethod} (Total: ₹{placedOrder.total.toLocaleString('en-IN')})
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setTrackingOrderNumber(placedOrder.orderNumber);
                setIsTrackOrderModalOpen(true);
              }}
              className="w-full sm:w-auto bg-[#0F2340] hover:bg-[#18345C] text-white px-6 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Truck className="w-4 h-4 text-orange-400" />
              <span>Track Live Delivery</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('orders');
              }}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 px-6 py-3 rounded-xl text-xs font-bold cursor-pointer"
            >
              View In My Orders
            </button>
            <button
              onClick={() => {
                setPlacedOrder(null);
                setCurrentView('home');
              }}
              className="w-full sm:w-auto bg-[#FF6B00] hover:bg-[#E65A00] text-white px-6 py-3 rounded-xl text-xs font-bold cursor-pointer shadow-xs"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Back button */}
      <div className="mb-6 flex items-center gap-2">
        <button
          onClick={() => setCurrentView('shop')}
          className="text-xs font-semibold text-slate-600 hover:text-orange-600 flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Shopping</span>
        </button>
      </div>

      {/* Progress Steps Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 -z-10" />

          {/* Step 1 */}
          <div className="flex flex-col items-center bg-white px-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                activeStep >= 1
                  ? 'bg-[#FF6B00] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              1
            </div>
            <span className="text-[11px] font-bold text-slate-800 mt-1">Delivery Address</span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center bg-white px-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                activeStep >= 2
                  ? 'bg-[#FF6B00] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              2
            </div>
            <span className="text-[11px] font-bold text-slate-800 mt-1">Order Summary</span>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center bg-white px-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                activeStep >= 3
                  ? 'bg-[#FF6B00] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              3
            </div>
            <span className="text-[11px] font-bold text-slate-800 mt-1">Payment</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Steps on Left, Order Summary on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: ACTIVE STEP ACCORDION */}
        <div className="lg:col-span-8 space-y-6">
          {/* STEP 1: ADDRESS */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-600" />
                <span>1. Select Delivery Address</span>
              </h2>
              {activeStep > 1 && (
                <button
                  onClick={() => setActiveStep(1)}
                  className="text-xs text-orange-600 font-bold hover:underline cursor-pointer"
                >
                  Change
                </button>
              )}
            </div>

            {activeStep === 1 ? (
              <div className="space-y-4">
                {/* Saved addresses list */}
                <div className="space-y-3">
                  {addresses.map(addr => (
                    <label
                      key={addr.id}
                      className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedAddressId === addr.id
                          ? 'border-[#FF6B00] bg-orange-50/40 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="deliveryAddress"
                          checked={selectedAddressId === addr.id}
                          onChange={() => setSelectedAddressId(addr.id)}
                          className="mt-1 accent-orange-600"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">{addr.name}</span>
                            <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                              {addr.type}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1">{addr.addressLine}, {addr.locality}</p>
                          <p className="text-xs text-slate-600">{addr.city}, {addr.state} - <strong>{addr.pincode}</strong></p>
                          <p className="text-[11px] text-slate-500 mt-1">Phone: {addr.phone}</p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Add new address toggle */}
                {!isAddingNewAddress ? (
                  <button
                    onClick={() => setIsAddingNewAddress(true)}
                    className="w-full py-2.5 border-2 border-dashed border-slate-300 hover:border-orange-500 rounded-xl text-xs font-bold text-slate-700 hover:text-orange-600 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Delivery Address</span>
                  </button>
                ) : (
                  /* Add new address form */
                  <form onSubmit={handleSaveNewAddress} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Add New Shipping Address
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={newAddr.name}
                          onChange={e => setNewAddr({ ...newAddr, name: e.target.value })}
                          className="w-full py-1.5 px-3 text-xs border border-slate-300 rounded-lg bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">Phone Number</label>
                        <input
                          type="text"
                          required
                          value={newAddr.phone}
                          onChange={e => setNewAddr({ ...newAddr, phone: e.target.value })}
                          className="w-full py-1.5 px-3 text-xs border border-slate-300 rounded-lg bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">PIN Code (6-digit)</label>
                        <input
                          type="text"
                          maxLength={6}
                          required
                          value={newAddr.pincode}
                          onChange={e => setNewAddr({ ...newAddr, pincode: e.target.value })}
                          className="w-full py-1.5 px-3 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">City</label>
                        <input
                          type="text"
                          required
                          value={newAddr.city}
                          onChange={e => setNewAddr({ ...newAddr, city: e.target.value })}
                          className="w-full py-1.5 px-3 text-xs border border-slate-300 rounded-lg bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">State</label>
                        <input
                          type="text"
                          required
                          value={newAddr.state}
                          onChange={e => setNewAddr({ ...newAddr, state: e.target.value })}
                          className="w-full py-1.5 px-3 text-xs border border-slate-300 rounded-lg bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">Flat, House no., Building, Apartment</label>
                      <input
                        type="text"
                        required
                        value={newAddr.addressLine}
                        onChange={e => setNewAddr({ ...newAddr, addressLine: e.target.value })}
                        className="w-full py-1.5 px-3 text-xs border border-slate-300 rounded-lg bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">Area, Street, Sector, Locality</label>
                      <input
                        type="text"
                        value={newAddr.locality}
                        onChange={e => setNewAddr({ ...newAddr, locality: e.target.value })}
                        className="w-full py-1.5 px-3 text-xs border border-slate-300 rounded-lg bg-white"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        className="bg-[#FF6B00] text-white px-4 py-2 rounded-lg text-xs font-bold"
                      >
                        Save & Use Address
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingNewAddress(false)}
                        className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="pt-2">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="bg-[#FF6B00] hover:bg-[#E65A00] text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Deliver to This Address</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* Collapsed state */
              <div className="text-xs text-slate-600">
                <span className="font-bold text-slate-800">{selectedAddress?.name}</span> · {selectedAddress?.addressLine}, {selectedAddress?.city} ({selectedAddress?.pincode})
              </div>
            )}
          </div>

          {/* STEP 2: ORDER SUMMARY */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-orange-600" />
                <span>2. Review Items in Bag ({cart.length})</span>
              </h2>
              {activeStep > 2 && (
                <button
                  onClick={() => setActiveStep(2)}
                  className="text-xs text-orange-600 font-bold hover:underline cursor-pointer"
                >
                  Modify
                </button>
              )}
            </div>

            {activeStep === 2 ? (
              <div className="space-y-4">
                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto pr-2">
                  {cart.map(item => (
                    <div key={item.id} className="py-3 first:pt-0 flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg bg-slate-50 border border-slate-200 overflow-hidden shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">{item.product.name}</p>
                        <p className="text-[11px] text-slate-500">
                          Variant: {item.selectedVariant} · Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-900 tabular-nums">
                          ₹{(item.effectivePrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>Guaranteed Dispatch within 24 Hours from New Delhi Warehouse.</span>
                </div>

                <div>
                  <button
                    onClick={() => setActiveStep(3)}
                    className="bg-[#FF6B00] hover:bg-[#E65A00] text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : activeStep > 2 ? (
              <p className="text-xs text-slate-600">
                {cart.length} item{cart.length === 1 ? '' : 's'} verified for dispatch
              </p>
            ) : null}
          </div>

          {/* STEP 3: PAYMENT METHOD */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
            <div className="pb-3 border-b border-slate-100 mb-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-orange-600" />
                <span>3. Select Payment Option</span>
              </h2>
            </div>

            {activeStep === 3 && (
              <div className="space-y-4">
                {/* 1. UPI */}
                <label
                  className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'UPI'
                      ? 'border-[#FF6B00] bg-orange-50/40'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                      className="mt-1 accent-orange-600"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <QrCode className="w-4 h-4 text-orange-600" />
                          <span>UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
                        </span>
                        <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                          FASTEST
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Scan instant QR code or enter your UPI Virtual Payment Address (VPA)
                      </p>

                      {paymentMethod === 'UPI' && (
                        <div className="mt-4 pt-3 border-t border-orange-200/60 flex flex-col sm:flex-row items-center gap-5">
                          {/* Simulated QR Code */}
                          <div className="w-28 h-28 bg-white p-2 rounded-xl border border-slate-300 shadow-xs flex flex-col items-center justify-center text-center shrink-0">
                            <div className="w-20 h-20 bg-slate-900 rounded-lg p-1.5 flex flex-col justify-between">
                              <div className="flex justify-between">
                                <div className="w-4 h-4 bg-white rounded-xs" />
                                <div className="w-4 h-4 bg-white rounded-xs" />
                              </div>
                              <div className="w-6 h-6 bg-orange-500 mx-auto rounded-xs flex items-center justify-center text-[8px] text-white font-bold">
                                BB
                              </div>
                              <div className="flex justify-between">
                                <div className="w-4 h-4 bg-white rounded-xs" />
                                <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                              </div>
                            </div>
                            <span className="text-[9px] font-bold text-slate-700 mt-1">Scan & Pay</span>
                          </div>

                          <div className="flex-1 w-full space-y-2">
                            <label className="text-[11px] font-semibold text-slate-700 block">
                              Or enter your UPI ID:
                            </label>
                            <input
                              type="text"
                              value={upiId}
                              onChange={e => setUpiId(e.target.value)}
                              placeholder="mobile@upi or user@okhdfcbank"
                              className="w-full py-1.5 px-3 text-xs border border-slate-300 rounded-lg font-mono bg-white"
                            />
                            <p className="text-[10px] text-slate-500">
                              A payment prompt will be sent instantly to your banking app.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </label>

                {/* 2. Cash on Delivery (COD) */}
                <label
                  className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'COD'
                      ? 'border-[#FF6B00] bg-orange-50/40'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="mt-1 accent-orange-600"
                    />
                    <div className="flex-1">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <Banknote className="w-4 h-4 text-emerald-600" />
                        <span>Cash on Delivery (COD)</span>
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Pay cash or scan courier QR code upon arrival at your doorstep.
                      </p>
                    </div>
                  </div>
                </label>

                {/* 3. Cards */}
                <label
                  className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'Card'
                      ? 'border-[#FF6B00] bg-orange-50/40'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'Card'}
                      onChange={() => setPaymentMethod('Card')}
                      className="mt-1 accent-orange-600"
                    />
                    <div className="flex-1">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                        <span>Credit / Debit Card (RuPay, Visa, Mastercard)</span>
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        128-bit bank-grade encryption with OTP verification.
                      </p>
                    </div>
                  </div>
                </label>

                {/* 4. Net Banking */}
                <label
                  className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'NetBanking'
                      ? 'border-[#FF6B00] bg-orange-50/40'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'NetBanking'}
                      onChange={() => setPaymentMethod('NetBanking')}
                      className="mt-1 accent-orange-600"
                    />
                    <div className="flex-1">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <Building className="w-4 h-4 text-indigo-600" />
                        <span>Net Banking</span>
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        State Bank of India, HDFC, ICICI, Axis Bank & 50+ Indian banks.
                      </p>
                    </div>
                  </div>
                </label>

                <div className="pt-4">
                  <button
                    onClick={handleCompleteOrder}
                    className="w-full bg-[#FF6B00] hover:bg-[#E65A00] text-white py-3.5 rounded-xl text-sm font-black flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98 cursor-pointer"
                  >
                    <span>Place Order & Pay ₹{finalTotal.toLocaleString('en-IN')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: PRICE BREAKDOWN & TRUST */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4 sticky top-28">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 uppercase tracking-wider">
            Order Price Details
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Price ({cart.length} items)</span>
              <span className="tabular-nums">₹{cartMrpTotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-emerald-700 font-semibold">
              <span>Discount on MRP</span>
              <span className="tabular-nums">-₹{cartSavings.toLocaleString('en-IN')}</span>
            </div>
            {couponDiscount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Coupon ({couponCode})</span>
                <span className="tabular-nums">-₹{couponDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Delivery Fee</span>
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

            <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline font-black text-slate-950 text-base">
              <span>Total Payable</span>
              <span className="text-xl tabular-nums">₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 font-bold">
            🎉 You will save ₹{(cartSavings + couponDiscount).toLocaleString('en-IN')} on this order!
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2 text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Safe and Secure Payments. 100% Authentic Products.</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Live SMS & WhatsApp Tracking updates provided.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
