import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck, Flame, Tag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface Slide {
  id: number;
  badge: string;
  badgeIcon: string;
  title: string;
  subtitle: string;
  discountHighlight: string;
  ctaText: string;
  categoryTarget: string;
  bgGradient: string;
  accentColor: string;
  image: string;
  tagline: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    badge: 'FESTIVE MEGA SALE',
    badgeIcon: 'sparkle',
    title: 'Grand Indian Festive & Wedding Collection',
    subtitle: 'Pure Banarasi silk sarees, embroidered kurtas & royal lehengas at direct loom prices.',
    discountHighlight: 'UP TO 65% OFF',
    ctaText: 'Shop Festive Fashion',
    categoryTarget: 'Fashion',
    bgGradient: 'from-[#0F2340] via-[#16355E] to-[#1F467A]',
    accentColor: '#FF6B00',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Authentic Indian Weaves & Fabrics'
  },
  {
    id: 2,
    badge: 'HERITAGE SPICE FESTIVAL',
    badgeIcon: 'flame',
    title: 'Pure Salem Haldi & Shahi Masalas Combo',
    subtitle: '100% pure cold-ground spices with natural aromatic oils, zero chemical polish or fillers.',
    discountHighlight: 'FLAT 40% OFF',
    ctaText: 'Explore Pure Masalas',
    categoryTarget: 'Grocery & Masala',
    bgGradient: 'from-[#542100] via-[#7B3306] to-[#A3440B]',
    accentColor: '#F59E0B',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80',
    tagline: 'FSSAI Certified · Farm Direct Sourcing'
  },
  {
    id: 3,
    badge: 'MONTH-END GROCERY DEALS',
    badgeIcon: 'tag',
    title: 'Aged Basmati Rice, Unpolished Dals & Kachi Ghani Oils',
    subtitle: 'Stock your family kitchen with pantry staples that cook with aroma, purity, and nutrition.',
    discountHighlight: 'MIN 30% OFF',
    ctaText: 'Stock Pantry Staples',
    categoryTarget: 'Grocery & Masala',
    bgGradient: 'from-[#143D2A] via-[#1E573C] to-[#2B7A55]',
    accentColor: '#10B981',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Free Delivery to Your Doorstep'
  },
  {
    id: 4,
    badge: 'TECH & HOME APPLIANCES',
    badgeIcon: 'sparkle',
    title: 'Smart Gadgets & Tri-Ply Stainless Cookware',
    subtitle: 'AMOLED calling watches, ANC audio & durable heavy-gauge kitchen utensils.',
    discountHighlight: 'UP TO 60% OFF',
    ctaText: 'Discover Smart Living',
    categoryTarget: 'Electronics',
    bgGradient: 'from-[#0A1728] via-[#122338] to-[#1E3A5F]',
    accentColor: '#38BDF8',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Brand Warranty Included'
  }
];

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const { navigateToCategory } = useStore();

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full overflow-hidden bg-slate-900 rounded-2xl shadow-xl my-4"
    >
      <div className={`relative min-h-[380px] sm:min-h-[440px] md:min-h-[480px] bg-gradient-to-r ${slide.bgGradient} flex items-center transition-all duration-700`}>
        {/* Subtle decorative background glow */}
        <div className="absolute inset-0 bg-radial from-white/5 to-transparent pointer-events-none" />

        {/* Content & Imagery Grid */}
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-10 w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Text Block */}
          <div className="md:col-span-7 flex flex-col items-start gap-4 text-white">
            {/* Tag Badge */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md text-amber-300 border border-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                {slide.badge}
              </span>
              <span className="hidden sm:inline-flex text-xs font-semibold text-white/80">
                · {slide.tagline}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display leading-[1.15] text-balance">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-200/90 max-w-xl font-normal leading-relaxed">
              {slide.subtitle}
            </p>

            {/* Big Discount Highlight */}
            <div className="flex items-center gap-3 pt-1">
              <div className="bg-[#FF6B00] text-white font-black text-sm sm:text-base px-3.5 py-1.5 rounded-lg shadow-md tracking-wider">
                {slide.discountHighlight}
              </div>
              <span className="text-xs text-amber-200 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Extra 10% off with SBI / HDFC Cards
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => navigateToCategory(slide.categoryTarget)}
                className="bg-white hover:bg-amber-50 text-slate-900 font-bold px-6 py-3 rounded-xl text-sm transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4 text-[#FF6B00]" />
              </button>
            </div>
          </div>

          {/* Right Product Showcase Card */}
          <div className="md:col-span-5 hidden md:flex justify-center relative">
            <div className="relative w-72 h-80 lg:w-80 lg:h-96 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl group">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Featured Showcase
                </span>
                <p className="text-sm font-semibold line-clamp-1">{slide.title}</p>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-300">
                  <span>Fast 24-48h Dispatch</span>
                  <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded">
                    Verified Quality
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Previous / Next Controls */}
        <button
          onClick={() => setCurrentSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-xs flex items-center justify-center transition-colors cursor-pointer z-20"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-xs flex items-center justify-center transition-colors cursor-pointer z-20"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {HERO_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentSlide === idx ? 'w-8 bg-[#FF6B00]' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
