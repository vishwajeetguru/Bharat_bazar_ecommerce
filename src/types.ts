export type CategoryType = 
  | 'Fashion' 
  | 'Grocery & Masala' 
  | 'Beauty' 
  | 'Home & Kitchen' 
  | 'Electronics' 
  | 'Footwear' 
  | 'Kids Wear';

export interface ProductVariant {
  id: string;
  label: string;
  priceDelta?: number;
  mrpDelta?: number;
  inStock?: boolean;
}

export interface GroceryInfo {
  fssaiLicense: string;
  shelfLife: string;
  expiryMonths: number;
  ingredients: string[];
  originState: string;
}

export interface FashionInfo {
  fabric: string;
  fit: string;
  pattern: string;
  care: string;
  returnPolicy: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategoryType;
  subcategory: string;
  price: number;
  mrp: number;
  discount: number;
  rating: number;
  reviewCount: number;
  stock: number;
  images: string[];
  secondaryImage?: string;
  badge?: string;
  variants: ProductVariant[];
  variantType: 'weight' | 'size' | 'color' | 'standard';
  isVeg?: boolean;
  highlights: string[];
  description: string;
  specifications: Record<string, string>;
  groceryInfo?: GroceryInfo;
  fashionInfo?: FashionInfo;
  deliveryDays: number;
  featured?: boolean;
  isDeal?: boolean;
  dealEndsInHours?: number;
  newArrival?: boolean;
  trending?: boolean;
}

export interface CartItem {
  id: string; // unique item id: productId + variantId
  productId: string;
  product: Product;
  selectedVariant: string;
  quantity: number;
  effectivePrice: number;
  effectiveMrp: number;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  pincode: string;
  addressLine: string;
  locality: string;
  city: string;
  state: string;
  isDefault: boolean;
  type: 'Home' | 'Work';
}

export type OrderStatus = 'Placed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface OrderTrackingStep {
  title: string;
  description: string;
  date: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  couponDiscount: number;
  deliveryFee: number;
  total: number;
  address: Address;
  paymentMethod: 'COD' | 'UPI' | 'Card' | 'NetBanking';
  paymentStatus: 'Paid' | 'Pending' | 'COD';
  status: OrderStatus;
  trackingSteps: OrderTrackingStep[];
  expectedDelivery: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
}

export type ViewType = 'home' | 'shop' | 'product-detail' | 'checkout' | 'orders' | 'wishlist' | 'admin';

export interface FilterState {
  category: string;
  subcategory: string;
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  minDiscount: number;
  vegOnly: boolean;
  inStockOnly: boolean;
  sortBy: 'popularity' | 'price-low' | 'price-high' | 'rating' | 'newest';
}
