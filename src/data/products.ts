import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // ===================== 1. CLOTHING & FASHION (10 items) =====================
  {
    id: 'prod-fash-1',
    name: 'Banarasi Kanjivaram Soft Silk Saree with Zari Woven Border',
    brand: 'Varanasi Weaves',
    category: 'Fashion',
    subcategory: 'Sarees',
    price: 1899,
    mrp: 4999,
    discount: 62,
    rating: 4.7,
    reviewCount: 3840,
    stock: 24,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    badge: 'Bestseller',
    variants: [
      { id: 'v-free', label: 'Free Size (5.5m + 0.8m Blouse)', priceDelta: 0, mrpDelta: 0, inStock: true }
    ],
    variantType: 'size',
    highlights: [
      'Authentic gold zari rich pallu with intricate floral motifs',
      'Includes unstitched matching brocade blouse piece',
      'Soft breathable blended silk fabric with luxurious sheen',
      'Ideal for weddings, festive ceremonies and traditional gatherings'
    ],
    description: 'Immerse in royal heritage with this handcrafted Banarasi soft silk saree featuring opulent jacquard weaving, heavy ethnic motifs, and a rich pallu.',
    specifications: {
      'Saree Fabric': 'Blended Katan Soft Silk',
      'Blouse Fabric': 'Matching Silk Jacquard',
      'Length': '5.5 meters Saree + 0.8 meter Blouse',
      'Occasion': 'Festive, Wedding, Traditional',
      'Care': 'Dry Clean Recommended'
    },
    fashionInfo: {
      fabric: 'Blended Soft Silk with Golden Metallic Zari',
      fit: 'Traditional Draped Fit',
      pattern: 'Woven Floral Jacquard',
      care: 'Dry clean only to maintain zari luster',
      returnPolicy: '7 Days Hassle-free Returns & Exchanges'
    },
    deliveryDays: 2,
    featured: true,
    trending: true
  },
  {
    id: 'prod-fash-2',
    name: 'Lucknowi Chikankari Embroidered Pure Cotton Straight Kurta',
    brand: 'Awadh Craft',
    category: 'Fashion',
    subcategory: 'Kurtas & Ethnic',
    price: 849,
    mrp: 1999,
    discount: 57,
    rating: 4.5,
    reviewCount: 2150,
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
    badge: 'Trending',
    variants: [
      { id: 'v-s', label: 'S (38)', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-m', label: 'M (40)', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-l', label: 'L (42)', priceDelta: 50, mrpDelta: 100, inStock: true },
      { id: 'v-xl', label: 'XL (44)', priceDelta: 50, mrpDelta: 100, inStock: true },
      { id: 'v-xxl', label: 'XXL (46)', priceDelta: 100, mrpDelta: 150, inStock: false }
    ],
    variantType: 'size',
    highlights: [
      'Authentic hand-embroidered Lucknowi Bakhiya and Phanda stitches',
      '100% fine breathable cambric cotton for all-day comfort',
      'Mandarin collar with subtle buttons and side slits',
      'Pre-shrunk and colour-fast certified fabric'
    ],
    description: 'Elevate your festive and everyday ethnic look with this handcrafted white Lucknowi Chikankari kurta crafted by master artisans in Lucknow.',
    specifications: {
      'Fabric': '100% Fine Cambric Cotton',
      'Sleeve Length': 'Long Sleeves',
      'Neckline': 'Mandarin Band Collar',
      'Length': 'Calf Length Straight Kurta'
    },
    fashionInfo: {
      fabric: '100% Combed Pure Cotton',
      fit: 'Regular Comfort Fit',
      pattern: 'Hand Embroidered Floral Chikankari',
      care: 'Gentle hand wash in cold water',
      returnPolicy: '7 Days Returnable with Tag Attached'
    },
    deliveryDays: 1,
    featured: true,
    newArrival: true
  },
  {
    id: 'prod-fash-3',
    name: 'Men\'s Heavyweight Combed Cotton Oversized Graphic T-Shirt',
    brand: 'Bharat Street',
    category: 'Fashion',
    subcategory: 'T-Shirts & Tops',
    price: 499,
    mrp: 1299,
    discount: 61,
    rating: 4.4,
    reviewCount: 1890,
    stock: 60,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
    badge: 'Buy 1 Get 1',
    variants: [
      { id: 'v-s', label: 'S (38")', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-m', label: 'M (40")', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-l', label: 'L (42")', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-xl', label: 'XL (44")', priceDelta: 0, mrpDelta: 0, inStock: true }
    ],
    variantType: 'size',
    highlights: [
      '240 GSM heavy gauge super combed bio-washed cotton',
      'Relaxed drop shoulder silhouette with ribbed collar',
      'High-definition crack-resistant screen print',
      'Zero shrinkage wash tested for 50+ wash cycles'
    ],
    description: 'Contemporary streetwear tee made with thick, ultra-comfortable 240 GSM bio-washed Indian cotton.',
    specifications: {
      'GSM': '240 GSM Heavy Weight',
      'Fit': 'Oversized Streetwear Drop Shoulder',
      'Composition': '100% Super Combed Cotton'
    },
    fashionInfo: {
      fabric: 'Bio-Washed 100% Cotton',
      fit: 'Oversized Boxy Fit',
      pattern: 'Minimal Typography Graphic',
      care: 'Machine wash inside out with cold water',
      returnPolicy: '7 Days Return or Size Exchange'
    },
    deliveryDays: 1,
    isDeal: true,
    dealEndsInHours: 6
  },
  {
    id: 'prod-fash-4',
    name: 'Men\'s Stretchable Indigo Slim Fit Denim Jeans',
    brand: 'Denim Republic',
    category: 'Fashion',
    subcategory: 'Jeans & Trousers',
    price: 999,
    mrp: 2499,
    discount: 60,
    rating: 4.3,
    reviewCount: 3120,
    stock: 38,
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
    variants: [
      { id: 'v-30', label: '30 Waist', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-32', label: '32 Waist', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-34', label: '34 Waist', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-36', label: '36 Waist', priceDelta: 50, mrpDelta: 100, inStock: true }
    ],
    variantType: 'size',
    highlights: [
      'Power-stretch cotton elastane blend for effortless flex',
      'Classic 5-pocket styling with copper rivets and YKK zip fly',
      'Stone-washed indigo finish with subtle whiskers'
    ],
    description: 'Durable and ultra-flexible everyday denim with a modern slim tapered cut and premium stretch retention.',
    specifications: {
      'Material': '98% Cotton, 2% Elastane',
      'Rise': 'Mid Rise Waist',
      'Fly': 'YKK Zip Fly with Button Shank'
    },
    fashionInfo: {
      fabric: 'Stretch Indigo Denim',
      fit: 'Slim Tapered Fit',
      pattern: 'Solid Washed',
      care: 'Machine wash cold with like colors',
      returnPolicy: '7 Days Hassle-free Exchange'
    },
    deliveryDays: 2
  },
  {
    id: 'prod-fash-5',
    name: 'Royal Embroidered Velvet Bridal Lehenga Choli with Net Dupatta',
    brand: 'Maharani Couture',
    category: 'Fashion',
    subcategory: 'Ethnic Sets',
    price: 4499,
    mrp: 11999,
    discount: 62,
    rating: 4.8,
    reviewCount: 890,
    stock: 12,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    badge: 'Festive Special',
    variants: [
      { id: 'v-semi', label: 'Semi-Stitched (Up to 44 Bust)', priceDelta: 0, mrpDelta: 0, inStock: true }
    ],
    variantType: 'size',
    highlights: [
      'Opulent micro-velvet fabric with intricate dori, zari & sequin work',
      'Full 4-meter flare with double cancan underlayer',
      'Includes unstitched blouse and embellished soft net dupatta'
    ],
    description: 'Showstopper bridal lehenga in rich crimson velvet, intricately embroidered with golden threads and sparkling sequins.',
    specifications: {
      'Lehenga Fabric': 'Micro Velvet with Cancan Net',
      'Choli Fabric': 'Micro Velvet Embroidered',
      'Dupatta': 'Soft Net with Embroidered Lace Border'
    },
    fashionInfo: {
      fabric: 'Heavy Velvet & Soft Net',
      fit: 'Flared Royal Silhouette',
      pattern: 'Dori & Sequin Work',
      care: 'Strictly Dry Clean Only',
      returnPolicy: '7 Days Returnable with Security Seal Intact'
    },
    deliveryDays: 3,
    featured: true
  },
  {
    id: 'prod-fash-6',
    name: 'Pure Organic Linen Breathable Casual Button-Down Shirt',
    brand: 'Bharat Street',
    category: 'Fashion',
    subcategory: 'Shirts',
    price: 1199,
    mrp: 2799,
    discount: 57,
    rating: 4.6,
    reviewCount: 1420,
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
    variants: [
      { id: 'v-38', label: '38 (Small)', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-40', label: '40 (Medium)', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-42', label: '42 (Large)', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-44', label: '44 (XL)', priceDelta: 100, mrpDelta: 200, inStock: true }
    ],
    variantType: 'size',
    highlights: [
      '60 lea European linen blended with long-staple cotton',
      'Naturally cooling, airy, and moisture-wicking',
      'Spread collar with genuine horn-finish buttons'
    ],
    description: 'Crisp yet relaxed pure linen shirt, perfectly tailored for warm summer afternoons, office casuals, and resort wear.',
    specifications: {
      'Collar': 'Semi-Spread Collar',
      'Fabric Composition': '60% Flax Linen, 40% Cotton',
      'Pocket': 'Single Chest Patch Pocket'
    },
    fashionInfo: {
      fabric: 'Fine Flax Linen Blend',
      fit: 'Regular Tailored Fit',
      pattern: 'Solid Linen Weave',
      care: 'Machine wash gentle or dry clean',
      returnPolicy: '7 Days Exchange Available'
    },
    deliveryDays: 1,
    trending: true
  },
  {
    id: 'prod-fash-7',
    name: 'Embroidered Anarkali Kurta Set with Dupatta & Pants',
    brand: 'Varanasi Weaves',
    category: 'Fashion',
    subcategory: 'Ethnic Sets',
    price: 1599,
    mrp: 3999,
    discount: 60,
    rating: 4.6,
    reviewCount: 960,
    stock: 28,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=800&q=80',
    variants: [
      { id: 'v-s', label: 'S (36)', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-m', label: 'M (38)', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-l', label: 'L (40)', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-xl', label: 'XL (42)', priceDelta: 50, mrpDelta: 100, inStock: true }
    ],
    variantType: 'size',
    highlights: [
      'Gota patti detailing on yoke and hemline',
      'Flared rayon fabric that twirls effortlessly',
      'Complete 3-piece coordinated festive set'
    ],
    description: 'Graceful emerald green Anarkali ensemble featuring intricate gotta patti embellishments, tailored straight trousers, and printed dupatta.',
    specifications: {
      'Set Contains': 'Kurta, Trouser, Dupatta',
      'Fabric': 'Premium Viscose Rayon',
      'Work': 'Gota Patti & Foil Print'
    },
    fashionInfo: {
      fabric: 'Viscose Rayon with Foil Accents',
      fit: 'Flared Anarkali Fit',
      pattern: 'Traditional Motif Foil Print',
      care: 'Hand wash with mild liquid detergent',
      returnPolicy: '7 Days Returnable'
    },
    deliveryDays: 2
  },
  {
    id: 'prod-fash-8',
    name: 'Ethnic Nehru Modi Bandhgala Sleeveless Jacket',
    brand: 'Awadh Craft',
    category: 'Fashion',
    subcategory: 'Kurtas & Ethnic',
    price: 899,
    mrp: 2199,
    discount: 59,
    rating: 4.5,
    reviewCount: 780,
    stock: 20,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
    variants: [
      { id: 'v-38', label: '38 (Chest)', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-40', label: '40 (Chest)', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-42', label: '42 (Chest)', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-44', label: '44 (Chest)', priceDelta: 50, mrpDelta: 100, inStock: true }
    ],
    variantType: 'size',
    highlights: [
      'Structured jute-khadi blend with satin inner lining',
      'Mandarin collar with antique brass buttons',
      'Versatile layering piece over kurtas and formal shirts'
    ],
    description: 'Add a sophisticated touch of Indian statesmanship with this textured Nehru jacket featuring structured lapels and a pocket square slot.',
    specifications: {
      'Shell Fabric': 'Textured Khadi Poly-Blend',
      'Lining': 'Smooth Polyester Satin',
      'Closure': 'Front Button Fastening'
    },
    fashionInfo: {
      fabric: 'Khadi Textured Blend',
      fit: 'Regular Tailored Fit',
      pattern: 'Woven Slub Texture',
      care: 'Dry Clean Recommended',
      returnPolicy: '7 Days Return & Replacement'
    },
    deliveryDays: 1
  },
  {
    id: 'prod-fash-9',
    name: 'Handblock Printed Jaipur Pure Cotton Flared Maxi Dress',
    brand: 'Jaipur Loom',
    category: 'Fashion',
    subcategory: 'Kurtas & Ethnic',
    price: 799,
    mrp: 1899,
    discount: 58,
    rating: 4.4,
    reviewCount: 1340,
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    variants: [
      { id: 'v-s', label: 'S', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-m', label: 'M', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-l', label: 'L', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-xl', label: 'XL', priceDelta: 0, mrpDelta: 0, inStock: true }
    ],
    variantType: 'size',
    highlights: [
      'Authentic Bagru handblock wooden stamp print technique',
      'Tiered silhouette with flared hemline',
      'Includes tie-up waist belt with decorative tassels'
    ],
    description: 'Breezy handcrafted Rajasthani maxi dress made from 100% pure mulmul cotton, adorned with natural vegetable indigo prints.',
    specifications: {
      'Print': 'Authentic Handblock Print',
      'Fabric': '100% Breathable Mulmul Cotton',
      'Length': 'Ankle Length Maxi'
    },
    fashionInfo: {
      fabric: '100% Handloom Cotton',
      fit: 'A-Line Flared Fit',
      pattern: 'Traditional Floral Buti',
      care: 'First wash separate in cold water',
      returnPolicy: '7 Days Return Policy'
    },
    deliveryDays: 2
  },
  {
    id: 'prod-fash-10',
    name: 'Kids Festive Silk Kurta Pyjama with Brocade Koti Set',
    brand: 'Bharat Street',
    category: 'Kids Wear',
    subcategory: 'Boys Festive',
    price: 649,
    mrp: 1499,
    discount: 57,
    rating: 4.7,
    reviewCount: 640,
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=800&q=80',
    variants: [
      { id: 'v-2-3', label: '2-3 Years', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-4-5', label: '4-5 Years', priceDelta: 50, mrpDelta: 100, inStock: true },
      { id: 'v-6-7', label: '6-7 Years', priceDelta: 100, mrpDelta: 150, inStock: true },
      { id: 'v-8-9', label: '8-9 Years', priceDelta: 150, mrpDelta: 200, inStock: true }
    ],
    variantType: 'size',
    highlights: [
      'Skin-friendly cotton inner lining for child comfort',
      'Elasticated waistband pyjama for easy wearing',
      'Shimmering gold brocade ethnic jacket'
    ],
    description: 'Adore your little prince in this festive 3-piece traditional kurta, comfortable pyjama, and regal brocade jacket.',
    specifications: {
      'Pieces': 'Kurta, Pyjama, Jacket',
      'Fabric': 'Art Silk & Soft Cotton Lining',
      'Occasion': 'Diwali, Weddings, Pooja'
    },
    fashionInfo: {
      fabric: 'Art Silk with Cotton Inner',
      fit: 'Relaxed Kids Fit',
      pattern: 'Woven Jacquard Koti',
      care: 'Dry clean or gentle hand wash',
      returnPolicy: '7 Days Exchange Available'
    },
    deliveryDays: 1,
    newArrival: true
  },

  // ===================== 2. MASALA & GROCERY (10 items) =====================
  {
    id: 'prod-mas-1',
    name: 'Traditional Shahi Garam Masala (16 Aromatic Whole Spices)',
    brand: 'Bharat Spices',
    category: 'Grocery & Masala',
    subcategory: 'Blended Masalas',
    price: 125,
    mrp: 199,
    discount: 37,
    rating: 4.8,
    reviewCount: 4520,
    stock: 120,
    images: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80',
    badge: 'Flat 40% Off',
    variants: [
      { id: 'v-100g', label: '100g Pouch', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-250g', label: '250g Zipper Pack', priceDelta: 160, mrpDelta: 250, inStock: true },
      { id: 'v-500g', label: '500g Value Pack', priceDelta: 310, mrpDelta: 480, inStock: true },
      { id: 'v-1kg', label: '1kg Bulk Jar', priceDelta: 620, mrpDelta: 950, inStock: true }
    ],
    variantType: 'weight',
    isVeg: true,
    highlights: [
      'Slow-roasted 16 aromatic whole spices ground at low temperatures',
      'No added preservatives, fillers, artificial colors, or MSG',
      'Rich in natural essential oils preserving real aroma and flavor',
      'Certified 100% vegetarian with AGMARK & FSSAI standards'
    ],
    description: 'An authentic royal blend of 16 hand-selected hill spices including green cardamom, mace, cinnamon, cloves, and star anise. Slow roasted for unmatched fragrance.',
    specifications: {
      'Form': 'Fine Ground Powder',
      'Dietary Preference': '100% Pure Vegetarian',
      'Package Type': 'Multi-layer Foil Zip-lock Pouch',
      'Storage': 'Store in cool, dry place in airtight container'
    },
    groceryInfo: {
      fssaiLicense: '10019011006543',
      shelfLife: '12 Months from Packaging',
      expiryMonths: 12,
      ingredients: [
        'Coriander', 'Cumin', 'Black Pepper', 'Cinnamon', 'Cardamom',
        'Cloves', 'Nutmeg', 'Mace', 'Bay Leaf', 'Star Anise', 'Dry Ginger'
      ],
      originState: 'Kerala & Rajasthan, India'
    },
    deliveryDays: 1,
    featured: true,
    isDeal: true,
    dealEndsInHours: 8
  },
  {
    id: 'prod-mas-2',
    name: 'Salem Pure Organic Turmeric / Haldi Powder (High Curcumin 4.5%)',
    brand: 'Bharat Spices',
    category: 'Grocery & Masala',
    subcategory: 'Pure Ground Spices',
    price: 89,
    mrp: 145,
    discount: 39,
    rating: 4.9,
    reviewCount: 3910,
    stock: 95,
    images: [
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    badge: 'Organic',
    variants: [
      { id: 'v-200g', label: '200g Pack', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-500g', label: '500g Pack', priceDelta: 110, mrpDelta: 160, inStock: true },
      { id: 'v-1kg', label: '1kg Family Pack', priceDelta: 220, mrpDelta: 310, inStock: true }
    ],
    variantType: 'weight',
    isVeg: true,
    highlights: [
      'Naturally high 4.5%+ active Curcumin for immunity & golden color',
      'Sourced directly from organic certified farms in Salem, Tamil Nadu',
      'Lab tested for lead chromate and heavy metals (0% adulteration)'
    ],
    description: 'Pure Salem turmeric rhizomes, sun-dried and traditionally pulverized to preserve natural therapeutic oils and vibrant natural yellow hue.',
    specifications: {
      'Curcumin Content': '> 4.5% Active Lab Verified',
      'Type': 'Organic Salem Finger Turmeric',
      'FSSAI Certified': 'Yes'
    },
    groceryInfo: {
      fssaiLicense: '10019011006543',
      shelfLife: '18 Months',
      expiryMonths: 18,
      ingredients: ['100% Pure Organic Salem Turmeric'],
      originState: 'Salem, Tamil Nadu'
    },
    deliveryDays: 1,
    featured: true
  },
  {
    id: 'prod-mas-3',
    name: 'Kashmiri Deggi Mirchi Powder (Vibrant Natural Red Color)',
    brand: 'Bharat Spices',
    category: 'Grocery & Masala',
    subcategory: 'Pure Ground Spices',
    price: 110,
    mrp: 175,
    discount: 37,
    rating: 4.8,
    reviewCount: 3200,
    stock: 80,
    images: [
      'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    variants: [
      { id: 'v-100g', label: '100g Pack', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-250g', label: '250g Pack', priceDelta: 140, mrpDelta: 210, inStock: true },
      { id: 'v-500g', label: '500g Pack', priceDelta: 270, mrpDelta: 390, inStock: true }
    ],
    variantType: 'weight',
    isVeg: true,
    highlights: [
      'Mild heat with deep crimson hue without any artificial color',
      'Imparts restaurant-like vibrant gravies for curries and tikkas',
      'Pounded from select whole Kashmiri chillies'
    ],
    description: 'Bring the legendary rich red gravies of North Indian cuisine to life with mild heat and rich natural pepper flavor.',
    specifications: {
      'Pungency': 'Mild Scoville (Heat level 2/5)',
      'Color Value': 'Natural High ASTA > 130'
    },
    groceryInfo: {
      fssaiLicense: '10019011006543',
      shelfLife: '12 Months',
      expiryMonths: 12,
      ingredients: ['100% Stemless Kashmiri Red Chilies'],
      originState: 'Jammu & Kashmir, India'
    },
    deliveryDays: 1,
    trending: true
  },
  {
    id: 'prod-mas-4',
    name: 'Amritsari Chana & Pindi Chole Special Masala Blend',
    brand: 'Tadka King',
    category: 'Grocery & Masala',
    subcategory: 'Blended Masalas',
    price: 95,
    mrp: 149,
    discount: 36,
    rating: 4.7,
    reviewCount: 1680,
    stock: 70,
    images: [
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    variants: [
      { id: 'v-100g', label: '100g Pack', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-250g', label: '250g Pack', priceDelta: 120, mrpDelta: 180, inStock: true }
    ],
    variantType: 'weight',
    isVeg: true,
    highlights: [
      'Authentic Punjabi Dhaba flavor with Anardana (pomegranate seed) tang',
      'No need to add separate amchur or black pepper',
      'Gives dark authentic pindi chole tint naturally'
    ],
    description: 'Secret spice formulation crafted for genuine Amritsari Chana with roasted pomegranate seeds, black salt, and dried gooseberry.',
    specifications: {
      'Special Ingredient': 'Wild Anardana & Black Cardamom',
      'Veg Status': '100% Vegetarian'
    },
    groceryInfo: {
      fssaiLicense: '10014022001290',
      shelfLife: '12 Months',
      expiryMonths: 12,
      ingredients: ['Dried Pomegranate', 'Coriander', 'Cumin', 'Black Salt', 'Ajwain', 'Kasturi Methi', 'Cloves'],
      originState: 'Punjab, India'
    },
    deliveryDays: 1
  },
  {
    id: 'prod-mas-5',
    name: 'Kitchen King All-Purpose Curry Blend (Master Blend)',
    brand: 'Bharat Spices',
    category: 'Grocery & Masala',
    subcategory: 'Blended Masalas',
    price: 99,
    mrp: 155,
    discount: 36,
    rating: 4.7,
    reviewCount: 2890,
    stock: 85,
    images: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    variants: [
      { id: 'v-100g', label: '100g Pack', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-250g', label: '250g Pack', priceDelta: 130, mrpDelta: 190, inStock: true }
    ],
    variantType: 'weight',
    isVeg: true,
    highlights: [
      'One masala for all everyday sabzis, dal, and paneer curries',
      'Balanced with roasted coriander, fenugreek, and cardamom'
    ],
    description: 'The versatile all-in-one seasoning essential for every Indian kitchen to elevate everyday home-style cooking.',
    specifications: {
      'Use Case': 'All Indian Vegetables & Paneer',
      'No Added MSG': 'Yes'
    },
    groceryInfo: {
      fssaiLicense: '10019011006543',
      shelfLife: '12 Months',
      expiryMonths: 12,
      ingredients: ['Coriander', 'Cumin', 'Red Pepper', 'Turmeric', 'Fenugreek Leaves', 'Black Pepper', 'Nutmeg'],
      originState: 'Gujarat, India'
    },
    deliveryDays: 1
  },
  {
    id: 'prod-mas-6',
    name: 'Royal 2-Year Aged Long Grain Traditional Basmati Rice (5kg)',
    brand: 'Dawat Heritage',
    category: 'Grocery & Masala',
    subcategory: 'Rice, Atta & Dals',
    price: 599,
    mrp: 899,
    discount: 33,
    rating: 4.8,
    reviewCount: 3410,
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=800&q=80',
    badge: 'Bestseller',
    variants: [
      { id: 'v-1kg', label: '1kg Pouch', priceDelta: -450, mrpDelta: -680, inStock: true },
      { id: 'v-5kg', label: '5kg Heritage Bag', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-10kg', label: '10kg Value Sack', priceDelta: 580, mrpDelta: 850, inStock: true }
    ],
    variantType: 'weight',
    isVeg: true,
    highlights: [
      'Aged naturally for 24 months for non-sticky, extra-long grains',
      'Grain elongates up to 2.5 times upon boiling with heavenly aroma',
      'Himalayan snow-fed foothills harvest with sweet natural taste'
    ],
    description: 'The crown jewel of Indian dining, this 2-year matured basmati rice delivers exquisite aroma and fluffy slender grains for Biryani and Pulao.',
    specifications: {
      'Grain Length': '8.4mm Pre-cooked Average',
      'Aging': '24 Months Naturally Matured',
      'Packaging': 'Heavy Duty Zipper Jute Bag'
    },
    groceryInfo: {
      fssaiLicense: '10012011000880',
      shelfLife: '24 Months',
      expiryMonths: 24,
      ingredients: ['100% Traditional Basmati Rice'],
      originState: 'Dehradun & Punjab Foothills'
    },
    deliveryDays: 1,
    featured: true
  },
  {
    id: 'prod-mas-7',
    name: 'Assam CTC Kadak Chai with Orthodox Long Leaves (1kg)',
    brand: 'Chai Mandir',
    category: 'Grocery & Masala',
    subcategory: 'Beverages',
    price: 349,
    mrp: 520,
    discount: 33,
    rating: 4.8,
    reviewCount: 2490,
    stock: 65,
    images: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    variants: [
      { id: 'v-500g', label: '500g Foil Pack', priceDelta: -160, mrpDelta: -240, inStock: true },
      { id: 'v-1kg', label: '1kg Tin Container', priceDelta: 0, mrpDelta: 0, inStock: true }
    ],
    variantType: 'weight',
    isVeg: true,
    highlights: [
      'Upper Assam second-flush harvest with bold malty liquor',
      '15% whole orthodox leaf blend for unmatched lingering aroma',
      'Rich golden liquor with creamy milk compatibility'
    ],
    description: 'Experience the authentic roadside dhaba and traditional morning cup with strong briskness, deep amber liquor, and rich Assam aroma.',
    specifications: {
      'Grade': 'BP / BOP CTC + Whole Orthodox Leaf',
      'Caffeine': 'Standard High Energizing'
    },
    groceryInfo: {
      fssaiLicense: '10016071000213',
      shelfLife: '12 Months',
      expiryMonths: 12,
      ingredients: ['100% Pure Assam Black Tea'],
      originState: 'Upper Assam, India'
    },
    deliveryDays: 1
  },
  {
    id: 'prod-mas-8',
    name: 'Unpolished Organic Toor / Arhar Dal (Protein Rich, 1kg)',
    brand: 'Bharat Spices',
    category: 'Grocery & Masala',
    subcategory: 'Rice, Atta & Dals',
    price: 165,
    mrp: 230,
    discount: 28,
    rating: 4.6,
    reviewCount: 1820,
    stock: 80,
    images: [
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    variants: [
      { id: 'v-1kg', label: '1kg Pack', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-2kg', label: '2kg Pack', priceDelta: 160, mrpDelta: 220, inStock: true },
      { id: 'v-5kg', label: '5kg Value Bag', priceDelta: 620, mrpDelta: 890, inStock: true }
    ],
    variantType: 'weight',
    isVeg: true,
    highlights: [
      'Unpolished — no water, leather, or synthetic oil polishing used',
      'Naturally high 22g protein per 100g with dietary fiber',
      'Cooks smooth and buttery with easy digestion'
    ],
    description: 'Farm-fresh unpolished pigeon pea lentils containing all original vitamins, dietary fiber, and authentic earthy aroma.',
    specifications: {
      'Polish': 'Zero Chemical Polish (Raw Unpolished)',
      'Protein': '22g per 100g'
    },
    groceryInfo: {
      fssaiLicense: '10019011006543',
      shelfLife: '9 Months',
      expiryMonths: 9,
      ingredients: ['100% Unpolished Organic Toor Dal'],
      originState: 'Maharashtra, India'
    },
    deliveryDays: 1
  },
  {
    id: 'prod-mas-9',
    name: 'Kachi Ghani Cold-Pressed Pure Mustard Oil (Sarson Ka Tel, 1L)',
    brand: 'Bharat Spices',
    category: 'Grocery & Masala',
    subcategory: 'Oils & Ghee',
    price: 175,
    mrp: 250,
    discount: 30,
    rating: 4.8,
    reviewCount: 3120,
    stock: 75,
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    variants: [
      { id: 'v-1l', label: '1 Litre Bottle', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-2l', label: '2 Litre Pet Jar', priceDelta: 165, mrpDelta: 240, inStock: true },
      { id: 'v-5l', label: '5 Litre Value Can', priceDelta: 680, mrpDelta: 990, inStock: true }
    ],
    variantType: 'weight',
    isVeg: true,
    highlights: [
      'First cold-press extraction using wooden Kolhu (cold expeller)',
      'High natural pungency (Jhaanjh) that authentic pickles demand',
      'Packed with natural Omega-3 and Vitamin E'
    ],
    description: 'Traditional wood-pressed golden yellow mustard oil with intense pungency and authentic aroma for pickles, fish curry, and tadkas.',
    specifications: {
      'Extraction': 'Wood Cold Press (Kachi Ghani)',
      'Free From': 'Argemone Oil & Trans Fats'
    },
    groceryInfo: {
      fssaiLicense: '10019011006543',
      shelfLife: '12 Months',
      expiryMonths: 12,
      ingredients: ['100% Cold-Pressed Black Mustard Seeds'],
      originState: 'Rajasthan, India'
    },
    deliveryDays: 1,
    trending: true
  },
  {
    id: 'prod-mas-10',
    name: 'Natural Himalayan Pink Rock Salt (Sendha Namak, 1kg)',
    brand: 'Pavitra Wellness',
    category: 'Grocery & Masala',
    subcategory: 'Pure Ground Spices',
    price: 85,
    mrp: 140,
    discount: 39,
    rating: 4.7,
    reviewCount: 1420,
    stock: 90,
    images: [
      'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    variants: [
      { id: 'v-500g', label: '500g Shaker Jar', priceDelta: -30, mrpDelta: -50, inStock: true },
      { id: 'v-1kg', label: '1kg Pouch', priceDelta: 0, mrpDelta: 0, inStock: true }
    ],
    variantType: 'weight',
    isVeg: true,
    highlights: [
      '100% natural Sendha Namak ideal for daily food and fasting (Vrat)',
      'Contains 84 trace minerals including potassium, calcium and magnesium',
      'Non-iodized and unrefined'
    ],
    description: 'Pure crystalline pink rock salt mined from ancient Himalayan deposits, unrefined and chemical-free for wholesome wellness.',
    specifications: {
      'Mineral Content': '84 Trace Elements',
      'Grain': 'Fine Table Grind'
    },
    groceryInfo: {
      fssaiLicense: '10017011004128',
      shelfLife: '24 Months',
      expiryMonths: 24,
      ingredients: ['100% Natural Himalayan Pink Mineral Salt'],
      originState: 'Himalayan Foothills'
    },
    deliveryDays: 1
  },

  // ===================== 3. OTHER CATEGORIES: BEAUTY, KITCHEN, ELECTRONICS, FOOTWEAR (12 items) =====================
  {
    id: 'prod-oth-1',
    name: 'Purifying Organic Neem & Tulsi Herbal Anti-Acne Face Wash (150ml)',
    brand: 'AyurVeda Naturals',
    category: 'Beauty',
    subcategory: 'Skin Care',
    price: 249,
    mrp: 450,
    discount: 45,
    rating: 4.6,
    reviewCount: 3200,
    stock: 60,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597359-5437149c4021?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1608248597359-5437149c4021?auto=format&fit=crop&w=800&q=80',
    badge: 'Trending',
    variants: [
      { id: 'v-150ml', label: '150ml Tube', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-300ml', label: '300ml Value Pump', priceDelta: 190, mrpDelta: 350, inStock: true }
    ],
    variantType: 'weight',
    highlights: [
      'Soap-free gentle herbal formula with real tea tree extract',
      'Sulphate-free, paraben-free and cruelty-free certified',
      'Deeply cleanses excess sebum without stripping moisture'
    ],
    description: 'Enriched with cold-pressed neem oil, holy basil, and green tea to purify pores, diminish blemishes, and balance excess oil.',
    specifications: {
      'Skin Type': 'All Skin Types (Acne Prone)',
      'Formulation': 'Gel-based foaming wash',
      'Toxin Free': '100% Vegan & Cruelty Free'
    },
    deliveryDays: 1,
    featured: true
  },
  {
    id: 'prod-oth-2',
    name: 'Tri-Ply Heavy Gauge Stainless Steel Pressure Cooker (5 Litre)',
    brand: 'KitchenCraft India',
    category: 'Home & Kitchen',
    subcategory: 'Cookware',
    price: 2199,
    mrp: 4499,
    discount: 51,
    rating: 4.8,
    reviewCount: 2150,
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80',
    badge: 'Top Rated',
    variants: [
      { id: 'v-3l', label: '3 Litre (Small Family)', priceDelta: -400, mrpDelta: -800, inStock: true },
      { id: 'v-5l', label: '5 Litre (Standard Family)', priceDelta: 0, mrpDelta: 0, inStock: true }
    ],
    variantType: 'size',
    highlights: [
      'Tri-ply construction: 304 food-grade steel + heavy aluminium core',
      'Even heat distribution eliminates food burning or hotspot sticking',
      'Gas and Induction cooktop compatible with ISI safety certification'
    ],
    description: 'Engineered for healthy modern cooking, this tri-ply pressure cooker cooks 2x faster while preserving vital nutrition and flavors.',
    specifications: {
      'Capacity': '5 Litre Inner Lid',
      'Material': 'Tri-Ply Stainless Steel (18/10)',
      'Warranty': '5 Years Manufacturer Guarantee'
    },
    deliveryDays: 2,
    featured: true
  },
  {
    id: 'prod-oth-3',
    name: 'Active Noise Cancelling Wireless Over-Ear Headphones (50H Playtime)',
    brand: 'SonicBharat',
    category: 'Electronics',
    subcategory: 'Audio',
    price: 1999,
    mrp: 4999,
    discount: 60,
    rating: 4.5,
    reviewCount: 1890,
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
    badge: 'Today\'s Deal',
    variants: [
      { id: 'v-black', label: 'Midnight Obsidian', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-silver', label: 'Lunar Silver', priceDelta: 0, mrpDelta: 0, inStock: true }
    ],
    variantType: 'color',
    highlights: [
      'Hybrid -32dB Active Noise Cancellation with Transparency Mode',
      '40mm titanium dynamic drivers with punchy deep bass',
      '50 Hours marathon battery with Type-C Quick Charge (10min = 5hrs)'
    ],
    description: 'Immerse in pure acoustic clarity, powerful Indian bass tuning, and plush memory-foam ear cushions designed for all-day comfort.',
    specifications: {
      'Bluetooth': 'Version 5.3 with Low Latency Gaming',
      'Microphone': 'Quad ENC Mics for Crystal Clear Calls',
      'Battery Life': 'Up to 50 Hours (ANC Off)'
    },
    deliveryDays: 1,
    isDeal: true,
    dealEndsInHours: 5
  },
  {
    id: 'prod-oth-4',
    name: 'Breathable CloudFoam Ultra-Light Running & Walking Shoes',
    brand: 'StrideFit',
    category: 'Footwear',
    subcategory: 'Sneakers',
    price: 1099,
    mrp: 2499,
    discount: 56,
    rating: 4.4,
    reviewCount: 2210,
    stock: 40,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
    variants: [
      { id: 'v-7', label: 'UK 7 (EU 41)', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-8', label: 'UK 8 (EU 42)', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-9', label: 'UK 9 (EU 43)', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-10', label: 'UK 10 (EU 44)', priceDelta: 50, mrpDelta: 100, inStock: true }
    ],
    variantType: 'size',
    highlights: [
      'Hyper-flexible flyknit mesh upper for maximum air circulation',
      'High-rebound EVA foam sole provides shock absorption on roads',
      'Anti-slip textured rubber grip pods'
    ],
    description: 'Featherweight athletic runners engineered for Indian road jogging, morning walks, gym workouts, and smart casual styling.',
    specifications: {
      'Upper Material': 'Engineered Flyknit Mesh',
      'Sole Material': 'CloudFoam EVA + Rubber Pods',
      'Closure': 'Lace-Up Fastening'
    },
    fashionInfo: {
      fabric: 'Breathable Mesh Knit',
      fit: 'True to Size Athletic Fit',
      pattern: 'Solid Contrast Aerodynamic',
      care: 'Wipe with damp cloth; air dry',
      returnPolicy: '7 Days Size Replacement Guarantee'
    },
    deliveryDays: 1,
    newArrival: true
  },
  {
    id: 'prod-oth-5',
    name: 'Heavy Gauge Hard Anodized Deep Kadai with Toughened Glass Lid (3.2L)',
    brand: 'KitchenCraft India',
    category: 'Home & Kitchen',
    subcategory: 'Cookware',
    price: 1149,
    mrp: 2299,
    discount: 50,
    rating: 4.7,
    reviewCount: 1780,
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80',
    variants: [
      { id: 'v-24cm', label: '24cm (2.5L)', priceDelta: -150, mrpDelta: -300, inStock: true },
      { id: 'v-26cm', label: '26cm (3.2L)', priceDelta: 0, mrpDelta: 0, inStock: true }
    ],
    variantType: 'size',
    highlights: [
      'Hard anodized surface is harder than steel, scratch proof and metal-spoon friendly',
      'Non-reactive with acidic foods like tomatoes and tamarind',
      'Stay-cool silicone cast riveted handles'
    ],
    description: 'The quintessential Indian cooking kadai for deep frying, sautéing bhindi, preparing rich paneer curries, and festival sweets.',
    specifications: {
      'Thickness': '3.25mm Extra Thick Body',
      'Base': 'Gas & Induction Compatible'
    },
    deliveryDays: 2
  },
  {
    id: 'prod-oth-6',
    name: 'Bringadi Intensive Ayurvedic Scalp Therapy Hair Oil (200ml)',
    brand: 'AyurVeda Naturals',
    category: 'Beauty',
    subcategory: 'Hair Care',
    price: 399,
    mrp: 750,
    discount: 47,
    rating: 4.7,
    reviewCount: 2650,
    stock: 55,
    images: [
      'https://images.unsplash.com/photo-1608248597359-5437149c4021?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    variants: [
      { id: 'v-100ml', label: '100ml Travel Size', priceDelta: -160, mrpDelta: -300, inStock: true },
      { id: 'v-200ml', label: '200ml Bottle', priceDelta: 0, mrpDelta: 0, inStock: true }
    ],
    variantType: 'weight',
    highlights: [
      'Infused with pure Bhringraj, Amla, Indigo, and sesame oil',
      'Clinically formulated to reduce hair fall and encourage new follicular density',
      'Traditional Ayurvedic Taila Paka Vidhi preparation'
    ],
    description: 'Traditional hair treatment formulated with potent herbs cooked in pure sesame oil and goat milk to revive hair roots and soothe the scalp.',
    specifications: {
      'Ingredients': 'Bhringraj, Amla, Mulethi, Sesame Oil',
      'Free From': 'Mineral Oil, Silicones, Artificial Perfume'
    },
    deliveryDays: 1,
    trending: true
  },
  {
    id: 'prod-oth-7',
    name: 'Ultra AMOLED 2.04" Bluetooth Calling Smartwatch with Rugged Bezel',
    brand: 'SonicBharat',
    category: 'Electronics',
    subcategory: 'Wearables',
    price: 1899,
    mrp: 5999,
    discount: 68,
    rating: 4.5,
    reviewCount: 3820,
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    badge: 'Deal of the Day',
    variants: [
      { id: 'v-black', label: 'Jet Black / Sport Strap', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-orange', label: 'Alpine Orange / Trail Loop', priceDelta: 100, mrpDelta: 200, inStock: true }
    ],
    variantType: 'color',
    highlights: [
      '1000 Nits high brightness Always-On AMOLED Display',
      'Single-chip Bluetooth calling with high fidelity loud speaker',
      '120+ Sports modes, Heart Rate, SpO2 & Sleep Tracker',
      'IP68 Water and dust resistance'
    ],
    description: 'Feature-loaded rugged smartwatch featuring an expansive curved AMOLED screen, metallic alloy frame, and 7-day battery life.',
    specifications: {
      'Display': '2.04" Super AMOLED 368x448 px',
      'Battery': 'Up to 7 Days Normal Use',
      'Compatibility': 'Android & iOS'
    },
    deliveryDays: 1,
    isDeal: true,
    dealEndsInHours: 4
  },
  {
    id: 'prod-oth-8',
    name: 'Handcrafted Pure Brass Peacock Diya Set for Pooja & Home Decor (Pair of 2)',
    brand: 'Varanasi Weaves',
    category: 'Home & Kitchen',
    subcategory: 'Home Decor',
    price: 799,
    mrp: 1799,
    discount: 56,
    rating: 4.8,
    reviewCount: 940,
    stock: 22,
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    variants: [
      { id: 'v-pair', label: 'Pair (2 Pieces - 7 Inch)', priceDelta: 0, mrpDelta: 0, inStock: true }
    ],
    variantType: 'size',
    highlights: [
      'Cast in 100% solid brass with traditional Mor (Peacock) finial',
      'Antique golden lacquer polish that resists tarnish',
      'Perfect auspicious gift for housewarming, Diwali, and daily pooja'
    ],
    description: 'Magnificent pair of traditional oil lamps hand-finished by hereditary brass artisans in Moradabad.',
    specifications: {
      'Material': '100% Solid Brass',
      'Weight': 'Approx 850 grams (Pair)',
      'Height': '7 Inches'
    },
    deliveryDays: 2,
    featured: true
  },
  {
    id: 'prod-oth-9',
    name: 'Water-Resistant Multi-Pocket Urban Laptop Backpack (30L)',
    brand: 'Bharat Street',
    category: 'Footwear',
    subcategory: 'Bags & Accessories',
    price: 899,
    mrp: 2299,
    discount: 61,
    rating: 4.5,
    reviewCount: 1540,
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
    variants: [
      { id: 'v-black', label: 'Carbon Black', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-grey', label: 'Heather Grey', priceDelta: 0, mrpDelta: 0, inStock: true }
    ],
    variantType: 'color',
    highlights: [
      'Dedicated padded cradle fits up to 15.6" laptops',
      'High-density 900D water-repellent oxford fabric with rain cover slot',
      'Ergonomic breathable honeycomb back padding and luggage strap'
    ],
    description: 'Designed for daily office commutes, college, and weekend travel with smart internal organizers and hidden anti-theft pocket.',
    specifications: {
      'Capacity': '30 Litres',
      'Material': 'Water-Repellent Oxford Polyester',
      'Warranty': '1 Year Stitching Warranty'
    },
    deliveryDays: 1
  },
  {
    id: 'prod-oth-10',
    name: '120W Dolby Audio Soundbar with Wired Subwoofer & Bluetooth 5.3',
    brand: 'SonicBharat',
    category: 'Electronics',
    subcategory: 'Audio',
    price: 3499,
    mrp: 8999,
    discount: 61,
    rating: 4.6,
    reviewCount: 1420,
    stock: 18,
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    variants: [
      { id: 'v-120w', label: '120W Peak Output (Subwoofer Included)', priceDelta: 0, mrpDelta: 0, inStock: true }
    ],
    variantType: 'standard',
    highlights: [
      '2.1 Channel room-filling theater surround sound with heavy thumping bass',
      'Multiple connectivity: HDMI ARC, Optical, AUX, USB & Bluetooth 5.3',
      'EQ modes for Movies, Music, News and 3D Gaming'
    ],
    description: 'Transform your TV into a cinema hall with deep sub-bass and crisp dialogue clarity.',
    specifications: {
      'Total Output': '120W RMS Peak',
      'Subwoofer': '5.25" Side-Firing Subwoofer',
      'Remote Included': 'Yes with EQ Controls'
    },
    deliveryDays: 2
  },
  {
    id: 'prod-oth-11',
    name: 'Traditional Kolhapuri Handcrafted Leather Chappals',
    brand: 'Bharat Street',
    category: 'Footwear',
    subcategory: 'Ethnic Footwear',
    price: 699,
    mrp: 1499,
    discount: 53,
    rating: 4.3,
    reviewCount: 880,
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    variants: [
      { id: 'v-7', label: 'UK 7', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-8', label: 'UK 8', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-9', label: 'UK 9', priceDelta: 0, mrpDelta: 0, inStock: true }
    ],
    variantType: 'size',
    highlights: [
      'Genuine vegetable-tanned buff leather with hand-braided details',
      'Authentic Kolhapur artisan craftsmanship with contrast pompom',
      'Natural breathing footbed softens with every wear'
    ],
    description: 'Timeless ethnic footwear that pairs magnificently with kurtas, dhotis, and casual linen pants for festivities.',
    specifications: {
      'Material': '100% Genuine Vegetable Tanned Leather',
      'Sole': 'Stitched Leather Base'
    },
    deliveryDays: 2
  },
  {
    id: 'prod-oth-12',
    name: 'Girls Festive Embroidered Jacquard Lehenga Choli Set',
    brand: 'Maharani Couture',
    category: 'Kids Wear',
    subcategory: 'Girls Festive',
    price: 899,
    mrp: 2199,
    discount: 59,
    rating: 4.7,
    reviewCount: 710,
    stock: 20,
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    variants: [
      { id: 'v-3-4', label: '3-4 Years', priceDelta: 0, mrpDelta: 0, inStock: true },
      { id: 'v-5-6', label: '5-6 Years', priceDelta: 50, mrpDelta: 100, inStock: true },
      { id: 'v-7-8', label: '7-8 Years', priceDelta: 100, mrpDelta: 150, inStock: true }
    ],
    variantType: 'size',
    highlights: [
      'Soft cotton lining underneath to avoid itchy feelings for kids',
      'Shimmering gold brocade fabric with tassel dori details',
      'Includes net dupatta with border lace'
    ],
    description: 'Festive yellow and magenta kids lehenga choli set tailored to give young girls comfort and dazzling ethnic elegance.',
    specifications: {
      'Fabric': 'Brocade Silk with Cotton Lining',
      'Occasion': 'Pooja, Weddings, Family Events'
    },
    deliveryDays: 1,
    newArrival: true
  }
];

export const CATEGORIES_DATA = [
  {
    id: 'Fashion',
    name: 'Fashion',
    hindiName: 'फैशन व परिधान',
    tagline: 'Sarees, Kurtas, T-Shirts & Jeans',
    count: '10+ Styles',
    icon: 'Shirt',
    color: 'from-orange-500 to-amber-600',
    subcategories: ['Sarees', 'Kurtas & Ethnic', 'T-Shirts & Tops', 'Jeans & Trousers', 'Ethnic Sets', 'Shirts']
  },
  {
    id: 'Grocery & Masala',
    name: 'Grocery & Masala',
    hindiName: 'किराना व शुद्ध मसाले',
    tagline: 'Pure Haldi, Garam Masala & Basmati',
    count: '10+ Staples',
    icon: 'Apple',
    color: 'from-amber-600 to-yellow-600',
    subcategories: ['Blended Masalas', 'Pure Ground Spices', 'Rice, Atta & Dals', 'Beverages', 'Oils & Ghee']
  },
  {
    id: 'Beauty',
    name: 'Beauty & Personal Care',
    hindiName: 'सौंदर्य व पर्सनल केयर',
    tagline: 'Ayurvedic Skincare & Hair Oils',
    count: 'Organic Glow',
    icon: 'Sparkles',
    color: 'from-rose-500 to-pink-600',
    subcategories: ['Skin Care', 'Hair Care', 'Body Care']
  },
  {
    id: 'Home & Kitchen',
    name: 'Home & Kitchen',
    hindiName: 'घर व रसोई',
    tagline: 'Tri-ply Cookers, Kadais & Brass Diyas',
    count: 'Durable Quality',
    icon: 'Utensils',
    color: 'from-blue-600 to-indigo-700',
    subcategories: ['Cookware', 'Home Decor', 'Kitchen Storage']
  },
  {
    id: 'Electronics',
    name: 'Electronics',
    hindiName: 'इलेक्ट्रॉनिक्स',
    tagline: 'Smartwatches, Audio & Soundbars',
    count: 'Best Value',
    icon: 'Headphones',
    color: 'from-slate-700 to-slate-900',
    subcategories: ['Audio', 'Wearables', 'Accessories']
  },
  {
    id: 'Footwear',
    name: 'Footwear & Bags',
    hindiName: 'जूते व बैग',
    tagline: 'CloudFoam Runners & Leather Chappals',
    count: 'All Sizes',
    icon: 'Footprints',
    color: 'from-teal-600 to-emerald-700',
    subcategories: ['Sneakers', 'Ethnic Footwear', 'Bags & Accessories']
  },
  {
    id: 'Kids Wear',
    name: 'Kids Wear',
    hindiName: 'बच्चों के कपड़े',
    tagline: 'Festive Kurtas & Party Sets',
    count: 'Comfort First',
    icon: 'Baby',
    color: 'from-purple-500 to-indigo-600',
    subcategories: ['Boys Festive', 'Girls Festive', 'Daily Wear']
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'ord-1001',
    orderNumber: 'BB-982410',
    date: 'Yesterday, 04:30 PM',
    items: [
      {
        id: 'prod-mas-1-v-250g',
        productId: 'prod-mas-1',
        product: INITIAL_PRODUCTS[10], // Shahi Garam Masala
        selectedVariant: '250g Zipper Pack',
        quantity: 2,
        effectivePrice: 285,
        effectiveMrp: 449
      },
      {
        id: 'prod-fash-2-v-m',
        productId: 'prod-fash-2',
        product: INITIAL_PRODUCTS[1], // Lucknowi Kurta
        selectedVariant: 'M (40)',
        quantity: 1,
        effectivePrice: 849,
        effectiveMrp: 1999
      }
    ],
    subtotal: 1419,
    discount: 1029,
    couponCode: 'BHARAT50',
    couponDiscount: 50,
    deliveryFee: 0,
    total: 1369,
    address: {
      id: 'addr-1',
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      pincode: '110001',
      addressLine: 'Flat 402, Royal Palms, Connaught Place',
      locality: 'Central Delhi',
      city: 'New Delhi',
      state: 'Delhi',
      isDefault: true,
      type: 'Home' as const
    },
    paymentMethod: 'UPI' as const,
    paymentStatus: 'Paid' as const,
    status: 'Shipped' as const,
    trackingSteps: [
      { title: 'Order Confirmed', description: 'Order verified by seller', date: 'Yesterday, 04:35 PM', completed: true },
      { title: 'Packed at Hub', description: 'Quality inspection passed at Delhi Warehouse', date: 'Yesterday, 08:20 PM', completed: true },
      { title: 'In Transit', description: 'Dispatched via Express Logistics', date: 'Today, 06:15 AM', completed: true, current: true },
      { title: 'Out for Delivery', description: 'Courier partner on the way', date: 'Expected by Tomorrow', completed: false },
      { title: 'Delivered', description: 'Package handed over', date: 'Tomorrow evening', completed: false }
    ],
    expectedDelivery: 'Tomorrow by 8:00 PM'
  }
];

export const INITIAL_ADDRESSES = [
  {
    id: 'addr-1',
    name: 'Priya Sharma',
    phone: '+91 98765 43210',
    pincode: '110001',
    addressLine: 'Flat 402, Royal Palms, Connaught Place',
    locality: 'Barakhamba Road',
    city: 'New Delhi',
    state: 'Delhi',
    isDefault: true,
    type: 'Home' as const
  },
  {
    id: 'addr-2',
    name: 'Priya Sharma (Office)',
    phone: '+91 98765 43210',
    pincode: '110020',
    addressLine: 'Tower B, Tech Park, Okhla Phase III',
    locality: 'Okhla Industrial Area',
    city: 'New Delhi',
    state: 'Delhi',
    isDefault: false,
    type: 'Work' as const
  }
];
