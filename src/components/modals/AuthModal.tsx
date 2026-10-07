import React, { useState } from 'react';
import { X, User, Phone, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login } = useStore();
  const [name, setName] = useState<string>('Priya Sharma');
  const [phoneOrEmail, setPhoneOrEmail] = useState<string>('+91 98765 43210');
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [otp, setOtp] = useState<string>('1234');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'details') {
      setStep('otp');
    } else {
      login(name, phoneOrEmail);
    }
  };

  const handleQuickCustomer = () => {
    login('Priya Sharma', '+91 98765 43210');
  };

  const handleQuickAdmin = () => {
    login('Admin - Store Manager', 'admin@bharatbazaar.in');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#0F2340] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <span className="font-extrabold text-xl text-[#FF6B00]">B</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 font-display">
            Welcome to Bharat<span className="text-[#FF6B00]">Bazaar</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Login or sign up to access exclusive family offers, wishlist & orders
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {step === 'details' ? (
            <>
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full py-2 px-3 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Mobile Number or Email
                </label>
                <input
                  type="text"
                  required
                  value={phoneOrEmail}
                  onChange={e => setPhoneOrEmail(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full py-2 px-3 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF6B00] hover:bg-[#E65A00] text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer mt-2"
              >
                Send 4-Digit OTP
              </button>
            </>
          ) : (
            <>
              <div className="text-center py-2">
                <span className="text-xs text-slate-600 block">
                  We sent a 4-digit verification code to
                </span>
                <strong className="text-xs text-slate-900 font-mono">{phoneOrEmail}</strong>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1 text-center">
                  Enter OTP Code (Default: 1234)
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  className="w-36 mx-auto block py-2 text-center text-lg font-mono font-bold tracking-widest border border-slate-300 rounded-lg focus:outline-hidden focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF6B00] hover:bg-[#E65A00] text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer mt-2"
              >
                Verify & Continue
              </button>
            </>
          )}
        </form>

        {/* Quick Demo Logins */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <p className="text-[10px] text-slate-600 uppercase tracking-wider font-bold text-center mb-2">
            One-Click Demo Sign In
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleQuickCustomer}
              className="py-1.5 px-2 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 text-[11px] font-semibold text-slate-700 cursor-pointer text-center"
            >
              Sign In as Customer
            </button>
            <button
              onClick={handleQuickAdmin}
              className="py-1.5 px-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 text-[11px] font-bold text-indigo-700 cursor-pointer text-center"
            >
              Sign In as Admin
            </button>
          </div>
        </div>

        <p className="text-[10px] text-slate-600 text-center mt-4">
          By continuing, you agree to Bharat Bazaar's Terms of Use & Privacy Policy.
        </p>
      </div>
    </div>
  );
};
