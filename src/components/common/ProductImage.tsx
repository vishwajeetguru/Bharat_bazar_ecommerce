import React, { useState } from 'react';
import { Sparkles, Utensils, Shirt, Apple, Footprints, Headphones, Package } from 'lucide-react';
import { CategoryType } from '../../types';

interface ProductImageProps {
  src: string;
  alt: string;
  secondarySrc?: string;
  category?: CategoryType;
  className?: string;
  isHovered?: boolean;
  aspectRatio?: 'square' | 'portrait' | 'wide';
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  secondarySrc,
  category = 'Fashion',
  className = '',
  isHovered = false,
  aspectRatio = 'square'
}) => {
  const [imageError, setImageError] = useState(false);
  const [secondaryError, setSecondaryError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getCategoryIcon = () => {
    switch (category) {
      case 'Fashion':
      case 'Kids Wear':
        return <Shirt className="w-10 h-10 text-orange-500 opacity-60" />;
      case 'Grocery & Masala':
        return <Apple className="w-10 h-10 text-amber-600 opacity-60" />;
      case 'Beauty':
        return <Sparkles className="w-10 h-10 text-rose-500 opacity-60" />;
      case 'Home & Kitchen':
        return <Utensils className="w-10 h-10 text-blue-600 opacity-60" />;
      case 'Electronics':
        return <Headphones className="w-10 h-10 text-slate-700 opacity-60" />;
      case 'Footwear':
        return <Footprints className="w-10 h-10 text-emerald-600 opacity-60" />;
      default:
        return <Package className="w-10 h-10 text-slate-500 opacity-60" />;
    }
  };

  const getCategoryGradient = () => {
    switch (category) {
      case 'Fashion':
      case 'Kids Wear':
        return 'from-orange-50 via-amber-50/40 to-slate-50';
      case 'Grocery & Masala':
        return 'from-amber-50 via-yellow-50/50 to-orange-50';
      case 'Beauty':
        return 'from-rose-50 via-pink-50/40 to-slate-50';
      case 'Home & Kitchen':
        return 'from-blue-50 via-indigo-50/40 to-slate-50';
      case 'Electronics':
        return 'from-slate-100 via-gray-50 to-slate-100';
      case 'Footwear':
        return 'from-emerald-50 via-teal-50/40 to-slate-50';
      default:
        return 'from-slate-100 to-gray-50';
    }
  };

  const aspectClass =
    aspectRatio === 'portrait' ? 'aspect-[3/4]' : aspectRatio === 'wide' ? 'aspect-[16/9]' : 'aspect-square';

  return (
    <div className={`relative overflow-hidden bg-slate-50 flex items-center justify-center ${aspectClass} ${className}`}>
      {/* Skeleton / Gradient backdrop */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient()} transition-opacity duration-300`} />

      {!imageError ? (
        <>
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isHovered && secondarySrc && !secondaryError ? 'opacity-0 scale-105' : 'opacity-100'
            } ${loaded ? 'blur-0' : 'blur-xs'}`}
          />

          {secondarySrc && !secondaryError && (
            <img
              src={secondarySrc}
              alt={`${alt} alternate angle`}
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={() => setSecondaryError(true)}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
            />
          )}
        </>
      ) : (
        /* Graceful Zero-Broken-Image fallback */
        <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center">
          <div className="w-16 h-16 rounded-full bg-white shadow-xs border border-slate-100 flex items-center justify-center mb-2">
            {getCategoryIcon()}
          </div>
          <span className="text-xs font-semibold text-slate-700 line-clamp-1">{alt}</span>
          <span className="text-[10px] uppercase tracking-wider text-slate-600 mt-0.5">{category}</span>
        </div>
      )}
    </div>
  );
};
