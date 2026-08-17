'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MENU_DATA } from '../data/menuData';

const AdminContext = createContext();

// Initial Mock Orders
const INITIAL_ORDERS = [
  {
    id: 'PS-1042',
    customer: { name: 'Aditi Deshmukh', phone: '+91 98450 12345' },
    type: 'Dine-in: Table 04',
    timestamp: '10 mins ago',
    items: [
      { name: 'Signature Pink Sauce Penne', qty: 2, price: 340 },
      { name: 'Pink Salt Velvet Cold Brew', qty: 2, price: 280 },
    ],
    notes: 'Extra cracked Himalayan salt on pasta, less ice in cold brew.',
    total: 1240,
    status: 'received', // 'received' | 'preparing' | 'ready' | 'completed'
  },
  {
    id: 'PS-1041',
    customer: { name: 'Rohit Kulkarni', phone: '+91 97412 88392' },
    type: 'Takeaway',
    timestamp: '18 mins ago',
    items: [
      { name: 'Blistered Margherita Pizza', qty: 1, price: 380 },
      { name: 'Baked Blueberry Cheesecake', qty: 1, price: 260 },
    ],
    notes: 'Packaging in eco-box. Pick-up at counter.',
    total: 640,
    status: 'preparing',
  },
  {
    id: 'PS-1040',
    customer: { name: 'Priya Patil', phone: '+91 94480 66201' },
    type: 'Dine-in: Table 02',
    timestamp: '25 mins ago',
    items: [
      { name: 'Golden Butter Croissant', qty: 2, price: 180 },
      { name: 'Single-Origin Morning Roast', qty: 2, price: 210 },
    ],
    notes: 'Warm croissants before serving.',
    total: 780,
    status: 'ready',
  },
  {
    id: 'PS-1039',
    customer: { name: 'Vikram Shenoy', phone: '+91 98860 44912' },
    type: 'Dine-in: Table 06',
    timestamp: '42 mins ago',
    items: [
      { name: 'Charred Truffle Mushroom Pizza', qty: 1, price: 440 },
      { name: 'Rustic Garlic Arrabiata', qty: 1, price: 310 },
    ],
    notes: 'Served and settled.',
    total: 750,
    status: 'completed',
  },
];

// Initial Customer CRM Data
const INITIAL_CUSTOMERS = [
  {
    id: 'CUST-01',
    name: 'Ananya Deshmukh',
    phone: '+91 98450 12345',
    email: 'ananya.deshmukh@gmail.com',
    ordersCount: 14,
    ltv: 4850,
    lastVisited: 'Yesterday',
    favoriteCategory: 'Pastas',
    segment: 'VIP Spenders (>₹2000)',
  },
  {
    id: 'CUST-02',
    name: 'Dr. Rohan Kulkarni',
    phone: '+91 97412 88392',
    email: 'rohan.kulkarni@apollo.org',
    ordersCount: 9,
    ltv: 3420,
    lastVisited: '3 days ago',
    favoriteCategory: 'Pizzas',
    segment: 'VIP Spenders (>₹2000)',
  },
  {
    id: 'CUST-03',
    name: 'Pooja Hegde',
    phone: '+91 94480 66201',
    email: 'pooja.foodie@outlook.com',
    ordersCount: 7,
    ltv: 2190,
    lastVisited: '1 week ago',
    favoriteCategory: 'Bakes',
    segment: 'Repeat Diners',
  },
  {
    id: 'CUST-04',
    name: 'Vikram Patil',
    phone: '+91 98860 44912',
    email: 'vikram.patil@techhub.in',
    ordersCount: 12,
    ltv: 3890,
    lastVisited: '2 days ago',
    favoriteCategory: 'Brews',
    segment: 'Cold Brew Lovers',
  },
  {
    id: 'CUST-05',
    name: 'Kavya Joshi',
    phone: '+91 99001 55678',
    email: 'kavya.j@gmail.com',
    ordersCount: 4,
    ltv: 1150,
    lastVisited: '5 days ago',
    favoriteCategory: 'Bakes',
    segment: 'Repeat Diners',
  },
  {
    id: 'CUST-06',
    name: 'Siddharth Hegde',
    phone: '+91 98451 99234',
    email: 'sid.hegde@infosys.com',
    ordersCount: 8,
    ltv: 2640,
    lastVisited: '4 days ago',
    favoriteCategory: 'Brews',
    segment: 'Cold Brew Lovers',
  },
];

export const AdminProvider = ({ children }) => {
  // Orders State
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  // Inventory State (initialized from MENU_DATA)
  const [inventory, setInventory] = useState(() => {
    return MENU_DATA.map((item) => ({
      ...item,
      inStock: true,
      isSpecial: item.featured || false,
    }));
  });

  // Customer CRM State
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);

  // Toast System for Admin
  const [toastMessage, setToastMessage] = useState(null);

  const showAdminToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 3000);
  };

  // Move Order to Next Pipeline Stage
  const advanceOrderStatus = (orderId) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        let nextStatus = order.status;
        if (order.status === 'received') nextStatus = 'preparing';
        else if (order.status === 'preparing') nextStatus = 'ready';
        else if (order.status === 'ready') nextStatus = 'completed';

        showAdminToast(`Order ${orderId} moved to ${nextStatus.toUpperCase()}`);
        return { ...order, status: nextStatus };
      })
    );
  };

  // Toggle Item Stock Status
  const toggleItemStock = (itemId) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const nextState = !item.inStock;
          showAdminToast(`${item.name} marked as ${nextState ? 'IN STOCK' : 'SOLD OUT'}`);
          return { ...item, inStock: nextState };
        }
        return item;
      })
    );
  };

  // Toggle Daily Special Flag
  const toggleItemSpecial = (itemId) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const nextState = !item.isSpecial;
          showAdminToast(`${item.name} ${nextState ? 'pinned to Daily Specials' : 'unpinned'}`);
          return { ...item, isSpecial: nextState };
        }
        return item;
      })
    );
  };

  // Update Item Price Inline
  const updateItemPrice = (itemId, newPrice) => {
    const numPrice = Number(newPrice);
    if (isNaN(numPrice) || numPrice <= 0) return;
    setInventory((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, price: numPrice } : item))
    );
    showAdminToast(`Price updated to ₹${numPrice}`);
  };

  return (
    <AdminContext.Provider
      value={{
        orders,
        inventory,
        customers,
        advanceOrderStatus,
        toggleItemStock,
        toggleItemSpecial,
        updateItemPrice,
        showAdminToast,
        toastMessage,
      }}
    >
      {children}
      {/* Admin Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[9999] bg-[#18181A] text-[#FAF7F2] border border-[#E8998D]/40 px-5 py-3 rounded-2xl shadow-2xl font-mono text-xs flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <span className="w-2 h-2 rounded-full bg-[#E8998D] animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
