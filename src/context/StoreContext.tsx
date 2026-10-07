import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  CartItem,
  Address,
  Order,
  OrderStatus,
  UserProfile,
  ViewType,
  FilterState
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_ADDRESSES } from '../data/products';

interface PincodeStatus {
  pincode: string;
  status: 'idle' | 'checking' | 'valid' | 'invalid';
  city?: string;
  deliveryDays?: number;
}

interface StoreContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  editProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleStock: (id: string) => void;

  cart: CartItem[];
  addToCart: (product: Product, variantLabel?: string, quantity?: number) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartMrpTotal: number;
  cartSavings: number;

  couponCode: string | null;
  couponDiscount: number;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  orders: Order[];
  placeOrder: (
    address: Address,
    paymentMethod: 'COD' | 'UPI' | 'Card' | 'NetBanking'
  ) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => Address;
  selectedAddressId: string;
  setSelectedAddressId: (id: string) => void;

  user: UserProfile | null;
  login: (name: string, phoneOrEmail: string) => void;
  logout: () => void;

  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedProduct: Product | null;

  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  navigateToCategory: (category: string, subcategory?: string) => void;

  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isTrackOrderModalOpen: boolean;
  setIsTrackOrderModalOpen: (open: boolean) => void;
  trackingOrderNumber: string;
  setTrackingOrderNumber: (num: string) => void;

  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;

  pincodeStatus: PincodeStatus;
  checkPincode: (pincode: string) => void;
}

const defaultFilters: FilterState = {
  category: 'All',
  subcategory: 'All',
  searchQuery: '',
  minPrice: 0,
  maxPrice: 15000,
  minRating: 0,
  minDiscount: 0,
  vegOnly: false,
  inStockOnly: false,
  sortBy: 'popularity'
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('bharat_products_v1');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bharat_products_v1', JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bharat_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bharat_cart_v1', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bharat_wishlist_v1');
      return saved ? JSON.parse(saved) : ['prod-mas-1', 'prod-fash-1'];
    } catch {
      return ['prod-mas-1', 'prod-fash-1'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bharat_wishlist_v1', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('bharat_orders_v1');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bharat_orders_v1', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  // Addresses
  const [addresses, setAddresses] = useState<Address[]>(() => {
    try {
      const saved = localStorage.getItem('bharat_addresses_v1');
      return saved ? JSON.parse(saved) : INITIAL_ADDRESSES;
    } catch {
      return INITIAL_ADDRESSES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bharat_addresses_v1', JSON.stringify(addresses));
    } catch {
      // ignore
    }
  }, [addresses]);

  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    addresses[0]?.id || 'addr-1'
  );

  // User Auth
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('bharat_user_v1');
      return saved
        ? JSON.parse(saved)
        : {
            name: 'Priya Sharma',
            email: 'priya.sharma@example.com',
            phone: '+91 98765 43210',
            role: 'customer'
          };
    } catch {
      return {
        name: 'Priya Sharma',
        email: 'priya.sharma@example.com',
        phone: '+91 98765 43210',
        role: 'customer'
      };
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('bharat_user_v1', JSON.stringify(user));
      } else {
        localStorage.removeItem('bharat_user_v1');
      }
    } catch {
      // ignore
    }
  }, [user]);

  // Navigation & Modals
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isTrackOrderModalOpen, setIsTrackOrderModalOpen] = useState<boolean>(false);
  const [trackingOrderNumber, setTrackingOrderNumber] = useState<string>('BB-982410');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  // Filters
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  // Coupons
  const [couponCode, setCouponCode] = useState<string | null>('BHARAT50');
  const [couponDiscount, setCouponDiscount] = useState<number>(50);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Pincode lookup simulator
  const [pincodeStatus, setPincodeStatus] = useState<PincodeStatus>({
    pincode: '110001',
    status: 'valid',
    city: 'New Delhi, Delhi',
    deliveryDays: 1
  });

  const checkPincode = (pincode: string) => {
    setPincodeStatus(prev => ({ ...prev, pincode, status: 'checking' }));
    setTimeout(() => {
      const clean = pincode.trim();
      if (clean.length === 6 && /^\d{6}$/.test(clean)) {
        let city = 'Metro Region';
        let days = 1;
        if (clean.startsWith('11') || clean.startsWith('12') || clean.startsWith('20')) {
          city = 'Delhi NCR';
          days = 1;
        } else if (clean.startsWith('40') || clean.startsWith('41')) {
          city = 'Mumbai / Pune, Maharashtra';
          days = 1;
        } else if (clean.startsWith('56')) {
          city = 'Bengaluru, Karnataka';
          days = 1;
        } else if (clean.startsWith('50')) {
          city = 'Hyderabad, Telangana';
          days = 2;
        } else if (clean.startsWith('70')) {
          city = 'Kolkata, West Bengal';
          days = 2;
        } else if (clean.startsWith('30')) {
          city = 'Jaipur, Rajasthan';
          days = 1;
        } else {
          city = 'All India Express Zone';
          days = 3;
        }
        setPincodeStatus({ pincode: clean, status: 'valid', city, deliveryDays: days });
      } else {
        setPincodeStatus({ pincode: clean, status: 'invalid' });
      }
    }, 400);
  };

  // Selected Product lookup
  const selectedProduct = products.find(p => p.id === selectedProductId) || null;

  // Cart operations
  const addToCart = (product: Product, variantLabel?: string, quantity: number = 1) => {
    const chosenVariant = variantLabel || (product.variants[0]?.label ?? 'Standard');
    const matchedVariant = product.variants.find(v => v.label === chosenVariant);
    const priceDelta = matchedVariant?.priceDelta || 0;
    const mrpDelta = matchedVariant?.mrpDelta || 0;
    const effectivePrice = Math.max(1, product.price + priceDelta);
    const effectiveMrp = Math.max(effectivePrice, product.mrp + mrpDelta);
    const itemId = `${product.id}-${chosenVariant}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          product,
          selectedVariant: chosenVariant,
          quantity,
          effectivePrice,
          effectiveMrp
        }
      ];
    });

    setIsCartOpen(true);
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.effectivePrice * item.quantity,
    0
  );
  const cartMrpTotal = cart.reduce(
    (sum, item) => sum + item.effectiveMrp * item.quantity,
    0
  );
  const cartSavings = Math.max(0, cartMrpTotal - cartSubtotal);

  // Coupons logic
  const applyCoupon = (code: string): boolean => {
    const formatted = code.trim().toUpperCase();
    setCouponError(null);

    if (cartSubtotal === 0) {
      setCouponError('Cart is empty. Add items to apply coupon.');
      return false;
    }

    if (formatted === 'BHARAT50') {
      setCouponCode('BHARAT50');
      setCouponDiscount(50);
      return true;
    } else if (formatted === 'FESTIVE100') {
      if (cartSubtotal < 999) {
        setCouponError('FESTIVE100 requires a minimum order value of ₹999.');
        return false;
      }
      setCouponCode('FESTIVE100');
      setCouponDiscount(100);
      return true;
    } else if (formatted === 'SUPER20' || formatted === 'FIRSTBUY') {
      const discount = Math.min(250, Math.round(cartSubtotal * 0.2));
      setCouponCode(formatted);
      setCouponDiscount(discount);
      return true;
    } else {
      setCouponError('Invalid coupon code. Try BHARAT50, FESTIVE100, or FIRSTBUY.');
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode(null);
    setCouponDiscount(0);
    setCouponError(null);
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Address operations
  const addAddress = (newAddr: Omit<Address, 'id'>): Address => {
    const created: Address = {
      ...newAddr,
      id: `addr-${Date.now()}`
    };
    setAddresses(prev => [created, ...prev]);
    setSelectedAddressId(created.id);
    return created;
  };

  // Place Order
  const placeOrder = (
    address: Address,
    paymentMethod: 'COD' | 'UPI' | 'Card' | 'NetBanking'
  ): Order => {
    const orderNumber = `BB-${Math.floor(100000 + Math.random() * 900000)}`;
    const deliveryFee = cartSubtotal >= 499 ? 0 : 49;
    const finalTotal = Math.max(0, cartSubtotal - couponDiscount + deliveryFee);

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      date: `Today, ${now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartSavings,
      couponCode: couponCode || undefined,
      couponDiscount,
      deliveryFee,
      total: finalTotal,
      address,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'COD' : 'Paid',
      status: 'Placed',
      trackingSteps: [
        {
          title: 'Order Placed',
          description: 'We have received your order and payment verification.',
          date: 'Just now',
          completed: true,
          current: true
        },
        {
          title: 'Packed at Warehouse',
          description: 'Quality check and barcode scanning.',
          date: 'Expected today',
          completed: false
        },
        {
          title: 'Shipped',
          description: 'Handed over to Express Courier.',
          date: 'Expected tomorrow',
          completed: false
        },
        {
          title: 'Out for Delivery',
          description: 'Delivery executive will deliver to your doorstep.',
          date: `${dateStr}`,
          completed: false
        },
        {
          title: 'Delivered',
          description: 'Delivered and signed.',
          date: 'Within 2 days',
          completed: false
        }
      ],
      expectedDelivery: 'Tomorrow by 8:00 PM'
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setTrackingOrderNumber(orderNumber);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;
        const steps = ord.trackingSteps.map((step, idx) => {
          if (status === 'Placed' && idx === 0) return { ...step, completed: true, current: true };
          if (status === 'Packed' && idx <= 1) return { ...step, completed: true, current: idx === 1 };
          if (status === 'Shipped' && idx <= 2) return { ...step, completed: true, current: idx === 2 };
          if (status === 'Out for Delivery' && idx <= 3) return { ...step, completed: true, current: idx === 3 };
          if (status === 'Delivered') return { ...step, completed: true, current: false };
          return step;
        });
        return { ...ord, status, trackingSteps: steps };
      })
    );
  };

  // Product CRUD (Admin)
  const addProduct = (prodData: Omit<Product, 'id'>) => {
    const newProd: Product = {
      ...prodData,
      id: `prod-custom-${Date.now()}`
    };
    setProducts(prev => [newProd, ...prev]);
  };

  const editProduct = (id: string, updated: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const toggleStock = (id: string) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, stock: p.stock > 0 ? 0 : 50 } : p
      )
    );
  };

  // User Auth
  const login = (name: string, phoneOrEmail: string) => {
    const isAdmin =
      phoneOrEmail.toLowerCase().includes('admin') ||
      name.toLowerCase().includes('admin');
    setUser({
      name: name || 'Valued Shopper',
      email: phoneOrEmail.includes('@') ? phoneOrEmail : `${name.toLowerCase().replace(/\s+/g, '')}@bharatbazaar.in`,
      phone: !phoneOrEmail.includes('@') ? phoneOrEmail : '+91 98765 43210',
      role: isAdmin ? 'admin' : 'customer'
    });
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  // Navigation helpers
  const navigateToCategory = (category: string, subcategory?: string) => {
    setFilters(prev => ({
      ...prev,
      category,
      subcategory: subcategory || 'All',
      searchQuery: ''
    }));
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        editProduct,
        deleteProduct,
        toggleStock,

        cart,
        addToCart,
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

        wishlist,
        toggleWishlist,
        isInWishlist,

        orders,
        placeOrder,
        updateOrderStatus,

        addresses,
        addAddress,
        selectedAddressId,
        setSelectedAddressId,

        user,
        login,
        logout,

        currentView,
        setCurrentView,
        selectedProductId,
        setSelectedProductId,
        selectedProduct,

        filters,
        setFilters,
        resetFilters,
        navigateToCategory,

        isCartOpen,
        setIsCartOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isTrackOrderModalOpen,
        setIsTrackOrderModalOpen,
        trackingOrderNumber,
        setTrackingOrderNumber,

        language,
        setLanguage,

        pincodeStatus,
        checkPincode
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
