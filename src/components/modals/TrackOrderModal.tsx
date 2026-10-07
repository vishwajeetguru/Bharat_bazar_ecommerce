import React, { useState } from 'react';
import { Truck, X, Search, CheckCircle2, Package, MapPin } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const TrackOrderModal: React.FC = () => {
  const {
    isTrackOrderModalOpen,
    setIsTrackOrderModalOpen,
    trackingOrderNumber,
    setTrackingOrderNumber,
    orders
  } = useStore();

  const [inputVal, setInputVal] = useState<string>(trackingOrderNumber || 'BB-982410');

  if (!isTrackOrderModalOpen) return null;

  const matchedOrder = orders.find(
    o =>
      o.orderNumber.toLowerCase() === inputVal.trim().toLowerCase() ||
      o.address.phone.includes(inputVal.trim())
  ) || orders[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
        <button
          onClick={() => setIsTrackOrderModalOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Track Your Shipment</h2>
            <p className="text-[11px] text-slate-500">Real-time status across Indian express logistics</p>
          </div>
        </div>

        {/* Input */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="Enter Order Number (e.g. BB-982410)"
            className="flex-1 py-2 px-3 text-xs border border-slate-300 rounded-lg font-mono focus:outline-hidden focus:border-orange-500"
          />
          <button
            onClick={() => setTrackingOrderNumber(inputVal)}
            className="bg-[#0F2340] hover:bg-[#18345C] text-white px-4 py-2 rounded-lg text-xs font-bold"
          >
            Track
          </button>
        </div>

        {matchedOrder ? (
          <div className="space-y-4">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Order</span>
                <span className="font-mono font-bold text-slate-900">{matchedOrder.orderNumber}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Status</span>
                <span className="font-bold text-orange-600 uppercase">{matchedOrder.status}</span>
              </div>
            </div>

            {/* Tracking steps timeline */}
            <div className="py-2 space-y-4">
              {matchedOrder.trackingSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 relative">
                  {idx < matchedOrder.trackingSteps.length - 1 && (
                    <div
                      className={`absolute left-2.5 top-6 bottom-0 w-0.5 ${
                        step.completed ? 'bg-emerald-500' : 'bg-slate-200'
                      }`}
                    />
                  )}
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold z-10 shrink-0 ${
                      step.completed
                        ? 'bg-emerald-600 text-white'
                        : step.current
                        ? 'bg-orange-500 text-white animate-pulse'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {step.completed ? '✓' : idx + 1}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{step.title}</p>
                    <p className="text-[11px] text-slate-500">{step.description}</p>
                    <span className="text-[10px] text-slate-600 font-mono">{step.date}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-800 flex items-center gap-2 border border-emerald-200">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Delivering to {matchedOrder.address.city} by {matchedOrder.expectedDelivery}</span>
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-500 text-center py-4">No active shipment found for this reference.</p>
        )}
      </div>
    </div>
  );
};
