import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Trash2,
  Edit2,
  Package,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Search,
  X,
  Truck,
  ArrowLeft
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product, CategoryType, OrderStatus } from '../../types';
import { CATEGORIES_DATA } from '../../data/products';

export const AdminPanel: React.FC = () => {
  const {
    products,
    addProduct,
    editProduct,
    deleteProduct,
    toggleStock,
    orders,
    updateOrderStatus,
    setCurrentView
  } = useStore();

  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form for New / Edit Product
  const [formData, setFormData] = useState({
    name: '',
    brand: 'Bharat Brands',
    category: 'Grocery & Masala' as CategoryType,
    subcategory: 'Blended Masalas',
    price: 199,
    mrp: 299,
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    description: 'High quality premium authentic product.',
    isVeg: true
  });

  // Stats
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const outOfStockCount = products.filter(p => p.stock === 0).length;

  const filteredProducts = products.filter(
    p =>
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      brand: 'Bharat Brands',
      category: 'Grocery & Masala',
      subcategory: 'Blended Masalas',
      price: 199,
      mrp: 299,
      stock: 50,
      imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
      description: 'High quality authentic product for Indian families.',
      isVeg: true
    });
    setEditingProduct(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      brand: p.brand,
      category: p.category,
      subcategory: p.subcategory,
      price: p.price,
      mrp: p.mrp,
      stock: p.stock,
      imageUrl: p.images[0] || '',
      description: p.description,
      isVeg: p.isVeg ?? false
    });
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const discount = Math.round(((formData.mrp - formData.price) / formData.mrp) * 100);

    if (editingProduct) {
      editProduct(editingProduct.id, {
        name: formData.name,
        brand: formData.brand,
        category: formData.category,
        subcategory: formData.subcategory,
        price: Number(formData.price),
        mrp: Number(formData.mrp),
        discount,
        stock: Number(formData.stock),
        description: formData.description,
        isVeg: formData.isVeg,
        images: [formData.imageUrl, editingProduct.images[1] || formData.imageUrl]
      });
    } else {
      addProduct({
        name: formData.name,
        brand: formData.brand,
        category: formData.category,
        subcategory: formData.subcategory,
        price: Number(formData.price),
        mrp: Number(formData.mrp),
        discount,
        stock: Number(formData.stock),
        rating: 4.8,
        reviewCount: 1,
        images: [formData.imageUrl],
        variants: [{ id: 'v-1', label: 'Standard Pack', priceDelta: 0, mrpDelta: 0, inStock: true }],
        variantType: 'standard',
        highlights: ['Freshly packaged', '100% genuine guaranteed'],
        description: formData.description,
        specifications: { 'Standard': 'Verified Quality' },
        deliveryDays: 2,
        isVeg: formData.isVeg
      });
    }

    setIsAddModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView('home')}
              className="text-xs font-semibold text-slate-500 hover:text-orange-600 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Exit Admin</span>
            </button>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
              Store Control Center
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-display mt-1">
            Bharat Bazaar Merchant Admin
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenAdd}
            className="bg-[#FF6B00] hover:bg-[#E65A00] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase block">Active Products</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">{products.length}</span>
          <span className="text-[11px] text-emerald-600 font-medium">Catalog live</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase block">Orders Placed</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">{orders.length}</span>
          <span className="text-[11px] text-blue-600 font-medium">Real-time sync</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase block">Total Revenue</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block tabular-nums">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-emerald-600 font-medium">Paid & COD</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase block">Low Stock Alerts</span>
          <span className={`text-2xl font-black mt-1 block ${outOfStockCount > 0 ? 'text-rose-600' : 'text-slate-900'}`}>
            {outOfStockCount}
          </span>
          <span className="text-[11px] text-slate-500 font-medium">Items with 0 stock</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 mb-6 gap-6">
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 text-xs font-bold transition-colors cursor-pointer border-b-2 -mb-[2px] ${
            activeTab === 'products'
              ? 'border-[#FF6B00] text-orange-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Manage Catalog Products ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 text-xs font-bold transition-colors cursor-pointer border-b-2 -mb-[2px] ${
            activeTab === 'orders'
              ? 'border-[#FF6B00] text-orange-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Manage Orders & Shipments ({orders.length})
        </button>
      </div>

      {/* TAB 1: PRODUCTS */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Search bar */}
          <div className="p-4 border-b border-slate-200 flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                placeholder="Search catalog by name or brand..."
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg"
              />
            </div>
            <span className="text-xs text-slate-500">{filteredProducts.length} items</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3 text-right">Price</th>
                  <th className="p-3 text-right">MRP</th>
                  <th className="p-3 text-center">Stock Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-slate-50">
                    <td className="p-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md overflow-hidden bg-slate-100 shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="min-w-0 max-w-xs">
                        <p className="font-bold text-slate-900 truncate">{product.name}</p>
                        <p className="text-[10px] text-slate-500">{product.brand}</p>
                      </div>
                    </td>
                    <td className="p-3 font-medium text-slate-700">{product.category}</td>
                    <td className="p-3 text-right font-bold text-slate-900 tabular-nums">
                      ₹{product.price}
                    </td>
                    <td className="p-3 text-right text-slate-600 line-through tabular-nums">
                      ₹{product.mrp}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => toggleStock(product.id)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer ${
                          product.stock > 0
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                      </button>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(product)}
                        className="p-1 text-slate-600 hover:text-orange-600 transition-colors cursor-pointer"
                        title="Edit Product"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-1 text-slate-600 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ORDERS */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Items</th>
                  <th className="p-3 text-right">Amount</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-800">{order.orderNumber}</td>
                    <td className="p-3">
                      <p className="font-semibold text-slate-900">{order.address.name}</p>
                      <p className="text-[10px] text-slate-500">{order.address.city}</p>
                    </td>
                    <td className="p-3 font-medium text-slate-700">
                      {order.items.length} product(s)
                    </td>
                    <td className="p-3 text-right font-bold text-slate-900 tabular-nums">
                      ₹{order.total.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3">
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                        {order.paymentMethod} ({order.paymentStatus})
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        value={order.status}
                        onChange={e => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className="text-xs font-bold border border-slate-300 rounded-md py-1 px-2 bg-white"
                      >
                        <option value="Placed">Placed</option>
                        <option value="Packed">Packed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADD / EDIT PRODUCT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
              {editingProduct ? 'Edit Product Details' : 'Add New Product to Store'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full py-1.5 px-3 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Brand Name</label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={e => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full py-1.5 px-3 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as CategoryType })}
                    className="w-full py-1.5 px-3 border border-slate-300 rounded-lg bg-white"
                  >
                    {CATEGORIES_DATA.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full py-1.5 px-3 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Original MRP (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.mrp}
                    onChange={e => setFormData({ ...formData, mrp: Number(e.target.value) })}
                    className="w-full py-1.5 px-3 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Stock Count</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={e => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full py-1.5 px-3 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Image URL</label>
                <input
                  type="text"
                  required
                  value={formData.imageUrl}
                  onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full py-1.5 px-3 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full py-1.5 px-3 border border-slate-300 rounded-lg"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={formData.isVeg}
                  onChange={e => setFormData({ ...formData, isVeg: e.target.checked })}
                  className="accent-emerald-600 rounded"
                />
                <span className="font-medium text-slate-700">100% Vegetarian certified</span>
              </label>

              <div className="pt-4 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#FF6B00] hover:bg-[#E65A00] text-white py-2 rounded-lg font-bold"
                >
                  Save Product
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
