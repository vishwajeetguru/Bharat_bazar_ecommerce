import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Mail,
  Send,
  Heart,
  Check
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES_DATA } from '../../data/products';

export const Footer: React.FC = () => {
  const { navigateToCategory, setCurrentView, setIsTrackOrderModalOpen } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#0A1728] text-slate-300 pt-12 pb-24 md:pb-12 border-t border-slate-800">
      {/* 4 Feature Trust Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-10 border-b border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-orange-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Free Delivery</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">On all prepaid & COD orders over ₹499</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">100% Genuine</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Direct loom & farm authentic sourcing</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-amber-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">7-Day Return</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Instant replacement & hassle-free pick</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-blue-400 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">24x7 Helpline</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Toll-free assistance: 1800-200-4567</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1: About Bharat Bazaar */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FF6B00] text-white flex items-center justify-center font-black">
              B
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white font-display">
              Bharat<span className="text-[#FF6B00]">Bazaar</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Bharat Bazaar is India's trusted online family store. We connect verified weavers, organic spice growers, and authentic brands directly with 10M+ families across India with honest prices and reliable delivery.
          </p>
          <div className="pt-2 text-xs text-slate-400">
            <p className="font-bold text-white">Registered Headquarters:</p>
            <p>Bharat Bazaar E-Commerce Logistics Hub, Connaught Place, New Delhi - 110001</p>
          </div>
        </div>

        {/* Column 2: Customer Policies */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3">
            Customer Care & Policies
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <button
                onClick={() => setIsTrackOrderModalOpen(true)}
                className="hover:text-orange-400 transition-colors"
              >
                Track Your Shipment
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView('orders')}
                className="hover:text-orange-400 transition-colors"
              >
                Return & Refund Policy
              </button>
            </li>
            <li>
              <span className="hover:text-orange-400 cursor-pointer">Shipping & Logistics Rates</span>
            </li>
            <li>
              <span className="hover:text-orange-400 cursor-pointer">FSSAI Certified Spices Assurance</span>
            </li>
            <li>
              <span className="hover:text-orange-400 cursor-pointer">Terms of Service & Privacy</span>
            </li>
            <li>
              <span className="hover:text-orange-400 cursor-pointer">Frequently Asked Questions (FAQ)</span>
            </li>
          </ul>
        </div>

        {/* Column 3: Top Categories */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3">
            Shop By Department
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            {CATEGORIES_DATA.map(c => (
              <li key={c.id}>
                <button
                  onClick={() => navigateToCategory(c.id)}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  {c.name} ({c.hindiName})
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Newsletter & Social */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3">
            Festive Offers & Newsletter
          </h4>
          <p className="text-xs text-slate-400 mb-3 leading-relaxed">
            Subscribe to receive exclusive festive coupon codes, new spice harvests, and flash sale notifications.
          </p>

          <form onSubmit={handleSubscribe} className="flex gap-2 mb-4">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={e => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full py-2 px-3 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-hidden focus:border-orange-500"
            />
            <button
              type="submit"
              className="bg-[#FF6B00] hover:bg-[#E65A00] text-white px-3.5 py-2 rounded-lg text-xs font-bold shrink-0 transition-colors cursor-pointer"
            >
              {subscribed ? <Check className="w-4 h-4 text-white" /> : <Send className="w-4 h-4" />}
            </button>
          </form>

          {subscribed && (
            <p className="text-[11px] text-emerald-400 mb-2">Thank you! Coupon sent to your inbox.</p>
          )}

          <div className="pt-2">
            <span className="text-[11px] font-bold text-white block mb-2">Payment Partners</span>
            <div className="flex flex-wrap gap-2 text-[10px] font-mono font-bold text-slate-300">
              <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">UPI</span>
              <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">RuPay</span>
              <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">Visa</span>
              <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">Mastercard</span>
              <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">NetBanking</span>
              <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">COD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 mt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
        <p>© 2026 Bharat Bazaar Pvt Ltd. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Made with pride in India for Indian Families
        </p>
      </div>
    </footer>
  );
};
