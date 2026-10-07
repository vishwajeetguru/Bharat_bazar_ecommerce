import React, { useState } from 'react';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ChevronRight,
  ArrowRight,
  RotateCcw,
  FileText,
  MapPin,
  Calendar,
  X
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Order } from '../../types';

export const OrdersView: React.FC = () => {
  const { orders, setCurrentView, setSelectedProductId, addToCart } = useStore();
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-600 mx-auto flex items-center justify-center mb-4">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">No Orders Placed Yet</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          You haven't placed any orders yet. Discover high quality Indian spices, fashion, and home goods today!
        </p>
        <button
          onClick={() => setCurrentView('shop')}
          className="mt-5 bg-[#FF6B00] hover:bg-[#E65A00] text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Title */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
            My Orders & Tracking
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            View history, track packages in transit, and download tax invoices
          </p>
        </div>
        <button
          onClick={() => setCurrentView('shop')}
          className="text-xs font-bold text-orange-600 hover:underline cursor-pointer"
        >
          Continue Shopping
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map(order => (
          <div
            key={order.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden"
          >
            {/* Order Top Bar */}
            <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-4 flex-wrap">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Order Placed</span>
                  <span className="font-semibold text-slate-800">{order.date}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Total Amount</span>
                  <span className="font-extrabold text-slate-900 tabular-nums">
                    ₹{order.total.toLocaleString('en-IN')}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Ship To</span>
                  <span className="font-semibold text-slate-800 truncate max-w-[120px] block">
                    {order.address.name}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-xs bg-white px-2 py-1 rounded border border-slate-200 font-bold text-slate-700">
                  {order.orderNumber}
                </span>
                <button
                  onClick={() => setSelectedInvoiceOrder(order)}
                  className="flex items-center gap-1 text-xs text-slate-600 hover:text-orange-600 font-semibold cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Invoice</span>
                </button>
              </div>
            </div>

            {/* Tracking Status Progress */}
            <div className="p-5 border-b border-slate-100 bg-amber-50/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">Delivery Status:</span>
                  <span
                    className={`text-xs font-black px-2.5 py-0.5 rounded-full uppercase ${
                      order.status === 'Delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : order.status === 'Shipped'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <span className="text-xs font-medium text-slate-600">
                  Expected: <strong className="text-slate-800">{order.expectedDelivery}</strong>
                </span>
              </div>

              {/* Steps Progress Visualizer */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {order.trackingSteps.map((step, idx) => (
                  <div key={idx} className="flex flex-col items-start text-left">
                    <div className="flex items-center gap-1.5 w-full">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          step.completed
                            ? 'bg-emerald-600 text-white'
                            : step.current
                            ? 'bg-orange-500 text-white animate-pulse'
                            : 'bg-slate-200 text-slate-400'
                        }`}
                      >
                        {step.completed ? '✓' : idx + 1}
                      </div>
                      <div
                        className={`flex-1 h-0.5 ${
                          step.completed ? 'bg-emerald-500' : 'bg-slate-200'
                        }`}
                      />
                    </div>
                    <span className="text-[11px] font-bold text-slate-800 mt-1.5">{step.title}</span>
                    <span className="text-[10px] text-slate-500 leading-tight">{step.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ordered Items */}
            <div className="p-5 space-y-4">
              {order.items.map(item => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2 first:pt-0"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      onClick={() => {
                        setSelectedProductId(item.productId);
                        setCurrentView('product-detail');
                      }}
                      className="w-16 h-16 rounded-lg bg-slate-50 border border-slate-200 overflow-hidden shrink-0 cursor-pointer"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4
                        onClick={() => {
                          setSelectedProductId(item.productId);
                          setCurrentView('product-detail');
                        }}
                        className="text-xs sm:text-sm font-bold text-slate-900 hover:text-orange-600 transition-colors cursor-pointer line-clamp-1"
                      >
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Brand: {item.product.brand} · Variant: {item.selectedVariant} · Qty: {item.quantity}
                      </p>
                      <p className="text-xs font-bold text-slate-800 mt-1 tabular-nums">
                        ₹{(item.effectivePrice * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => addToCart(item.product, item.selectedVariant, 1)}
                      className="bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-orange-200 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Buy Again</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProductId(item.productId);
                        setCurrentView('product-detail');
                      }}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      View Product
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* TAX INVOICE MODAL */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedInvoiceOrder(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-slate-200 pb-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-[#0F2340] font-display">
                    Bharat<span className="text-[#FF6B00]">Bazaar</span>
                  </h2>
                  <p className="text-[10px] text-slate-500">Retail Tax Invoice / Cash Receipt</p>
                </div>
                <div className="text-right text-xs">
                  <p className="font-bold font-mono text-slate-800">{selectedInvoiceOrder.orderNumber}</p>
                  <p className="text-slate-500">{selectedInvoiceOrder.date}</p>
                </div>
              </div>
            </div>

            <div className="text-xs space-y-1 mb-4 text-slate-600">
              <p><strong>Billed To:</strong> {selectedInvoiceOrder.address.name}</p>
              <p>{selectedInvoiceOrder.address.addressLine}, {selectedInvoiceOrder.address.city} ({selectedInvoiceOrder.address.pincode})</p>
              <p>Phone: {selectedInvoiceOrder.address.phone}</p>
              <p>Payment Mode: {selectedInvoiceOrder.paymentMethod} ({selectedInvoiceOrder.paymentStatus})</p>
            </div>

            <table className="w-full text-xs text-left mb-4 border border-slate-200 rounded-lg">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="p-2">Item Description</th>
                  <th className="p-2 text-center">Qty</th>
                  <th className="p-2 text-right">Price</th>
                  <th className="p-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {selectedInvoiceOrder.items.map(item => (
                  <tr key={item.id}>
                    <td className="p-2 font-medium">{item.product.name} ({item.selectedVariant})</td>
                    <td className="p-2 text-center">{item.quantity}</td>
                    <td className="p-2 text-right">₹{item.effectivePrice}</td>
                    <td className="p-2 text-right font-bold">₹{item.effectivePrice * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="space-y-1 text-xs border-t border-slate-200 pt-3">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{selectedInvoiceOrder.subtotal}</span>
              </div>
              {selectedInvoiceOrder.couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Coupon Discount:</span>
                  <span>-₹{selectedInvoiceOrder.couponDiscount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charges:</span>
                <span>{selectedInvoiceOrder.deliveryFee === 0 ? 'FREE' : `₹${selectedInvoiceOrder.deliveryFee}`}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Paid:</span>
                <span>₹{selectedInvoiceOrder.total}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedInvoiceOrder(null)}
              className="mt-6 w-full bg-[#0F2340] text-white py-2 rounded-lg text-xs font-bold"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
