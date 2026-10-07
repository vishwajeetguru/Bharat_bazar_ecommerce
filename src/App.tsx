import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { HomeView } from './components/home/HomeView';
import { ShopCatalog } from './components/shop/ShopCatalog';
import { ProductDetails } from './components/product/ProductDetails';
import { CheckoutView } from './components/checkout/CheckoutView';
import { OrdersView } from './components/orders/OrdersView';
import { WishlistView } from './components/wishlist/WishlistView';
import { AdminPanel } from './components/admin/AdminPanel';
import { CartDrawer } from './components/cart/CartDrawer';
import { TrackOrderModal } from './components/modals/TrackOrderModal';
import { AuthModal } from './components/modals/AuthModal';

const AppContent: React.FC = () => {
  const { currentView } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-slate-900 font-sans">
      {/* Header */}
      <Header />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'shop' && <ShopCatalog />}
        {currentView === 'product-detail' && <ProductDetails />}
        {currentView === 'checkout' && <CheckoutView />}
        {currentView === 'orders' && <OrdersView />}
        {currentView === 'wishlist' && <WishlistView />}
        {currentView === 'admin' && <AdminPanel />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <TrackOrderModal />
      <AuthModal />

      {/* Fixed Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
