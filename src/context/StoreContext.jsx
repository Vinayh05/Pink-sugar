'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { MENU_DATA } from '../data/menuData';

const StoreContext = createContext();

const STORAGE_KEY = 'pink_salt_global_state';

// Initial Mock Orders
const INITIAL_ORDERS = [
  {
    id: 'PS-1042',
    customerName: 'Aditi Deshmukh',
    customerPhone: '+91 98450 12345',
    customerEmail: 'aditi.deshmukh@gmail.com',
    tableOrTakeaway: 'Dine-in: Table 04',
    timestamp: '10 mins ago',
    items: [
      { name: 'Signature Pink Sauce Penne', qty: 2, price: 340 },
      { name: 'Pink Salt Velvet Cold Brew', qty: 2, price: 280 },
    ],
    notes: 'Extra cracked Himalayan salt on pasta, less ice in cold brew.',
    total: 1240,
    status: 'received', // 'received' | 'in_kitchen' | 'ready' | 'completed'
  },
  {
    id: 'PS-1041',
    customerName: 'Rohit Kulkarni',
    customerPhone: '+91 97412 88392',
    customerEmail: 'rohit.k@yahoo.com',
    tableOrTakeaway: 'Takeaway Pickup',
    timestamp: '18 mins ago',
    items: [
      { name: 'Blistered Margherita Pizza', qty: 1, price: 380 },
      { name: 'Baked Blueberry Cheesecake', qty: 1, price: 260 },
    ],
    notes: 'Packaging in eco-box. Pick-up at counter.',
    total: 640,
    status: 'in_kitchen',
  },
  {
    id: 'PS-1040',
    customerName: 'Priya Patil',
    customerPhone: '+91 94480 66201',
    customerEmail: 'priya.patil@outlook.com',
    tableOrTakeaway: 'Dine-in: Table 02',
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
    customerName: 'Vikram Shenoy',
    customerPhone: '+91 98860 44912',
    customerEmail: 'vikram.shenoy@corp.in',
    tableOrTakeaway: 'Dine-in: Table 06',
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

// Initial Initial Menu Items
const INITIAL_MENU = MENU_DATA.map((item) => ({
  ...item,
  isAvailable: true,
  isSpecial: item.featured || false,
}));

export const StoreProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState(INITIAL_MENU);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [toastMessage, setToastMessage] = useState(null);

  // 1. Initialize State from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.menuItems && Array.isArray(parsed.menuItems)) {
          // Merge with any new fields from master MENU_DATA
          const mergedMenu = INITIAL_MENU.map((masterItem) => {
            const savedItem = parsed.menuItems.find((s) => s.id === masterItem.id);
            return savedItem ? { ...masterItem, ...savedItem } : masterItem;
          });
          setMenuItems(mergedMenu);
        }
        if (parsed.orders && Array.isArray(parsed.orders)) {
          setOrders(parsed.orders);
        }
      }
    } catch (e) {
      console.warn('Could not read pink_salt_global_state from localStorage', e);
    }
  }, []);

  // 2. Persist State to LocalStorage & Dispatch Cross-Tab Sync
  const persistState = useCallback((newMenu, newOrders) => {
    try {
      const stateToSave = {
        menuItems: newMenu,
        orders: newOrders,
        updatedAt: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
      // Dispatch custom event for same-tab reactive updates
      window.dispatchEvent(new Event('pink_salt_state_change'));
    } catch (e) {
      console.error('Error saving pink_salt_global_state to localStorage', e);
    }
  }, []);

  // 3. Listen for Storage Events across browser tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed.menuItems) setMenuItems(parsed.menuItems);
          if (parsed.orders) setOrders(parsed.orders);
        } catch (err) {}
      }
    };

    const handleCustomChange = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.menuItems) setMenuItems(parsed.menuItems);
          if (parsed.orders) setOrders(parsed.orders);
        }
      } catch (err) {}
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('pink_salt_state_change', handleCustomChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('pink_salt_state_change', handleCustomChange);
    };
  }, []);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 3500);
  };

  // Actions for Menu & Inventory
  const toggleItemAvailability = (itemId) => {
    setMenuItems((prev) => {
      const next = prev.map((item) => {
        if (item.id === itemId) {
          const updated = !item.isAvailable;
          showToast(`${item.name} is now ${updated ? 'AVAILABLE' : 'SOLD OUT'}`);
          return { ...item, isAvailable: updated };
        }
        return item;
      });
      persistState(next, orders);
      return next;
    });
  };

  const updateItemPrice = (itemId, newPrice) => {
    const numPrice = Number(newPrice);
    if (isNaN(numPrice) || numPrice <= 0) return;
    setMenuItems((prev) => {
      const next = prev.map((item) => (item.id === itemId ? { ...item, price: numPrice } : item));
      persistState(next, orders);
      return next;
    });
    showToast(`Price updated to ₹${numPrice}`);
  };

  const toggleDailySpecial = (itemId) => {
    setMenuItems((prev) => {
      const next = prev.map((item) => {
        if (item.id === itemId) {
          const updated = !item.isSpecial;
          showToast(`${item.name} ${updated ? 'pinned to Daily Specials' : 'unpinned'}`);
          return { ...item, isSpecial: updated };
        }
        return item;
      });
      persistState(next, orders);
      return next;
    });
  };

  // Actions for Orders
  const placeOrder = (orderData) => {
    const newTicket = {
      id: orderData.id || `PS-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: orderData.customerName || 'Guest Patron',
      customerPhone: orderData.customerPhone || '+91 98765 43210',
      customerEmail: orderData.customerEmail || 'patron@pinksalt.com',
      tableOrTakeaway: orderData.tableOrTakeaway || 'Dine-in Table',
      timestamp: 'Just now',
      items: orderData.items || [],
      notes: orderData.notes || '',
      total: orderData.total || 0,
      status: 'received',
    };

    setOrders((prev) => {
      const next = [newTicket, ...prev];
      persistState(menuItems, next);
      return next;
    });

    showToast(`Order #${newTicket.id} confirmed! Sent directly to stone hearth kitchen.`);
    return newTicket;
  };

  const updateOrderStatus = (orderId, nextStatus) => {
    setOrders((prev) => {
      const next = prev.map((order) => {
        if (order.id === orderId) {
          showToast(`Order ${orderId} moved to ${nextStatus.toUpperCase()}`);
          return { ...order, status: nextStatus };
        }
        return order;
      });
      persistState(menuItems, next);
      return next;
    });
  };

  // Dynamic Customer CRM Derivation
  const customers = React.useMemo(() => {
    const map = new Map();

    // 1. Process from placed orders
    orders.forEach((ord) => {
      const phone = ord.customerPhone || 'unknown';
      if (!map.has(phone)) {
        map.set(phone, {
          id: `CUST-${phone.slice(-4)}`,
          name: ord.customerName || 'Guest Patron',
          phone: ord.customerPhone,
          email: ord.customerEmail || 'patron@example.com',
          ordersCount: 1,
          ltv: ord.total || 0,
          lastVisited: ord.timestamp,
          favoriteCategory: ord.items[0]?.name || 'Specialty Hearth',
          segment: ord.total > 2000 ? 'VIP Spenders (>₹2000)' : 'Dine-in Regular',
        });
      } else {
        const existing = map.get(phone);
        existing.ordersCount += 1;
        existing.ltv += ord.total || 0;
        if (existing.ltv > 2000) {
          existing.segment = 'VIP Spenders (>₹2000)';
        }
      }
    });

    // 2. Merge with fallback default patrons
    const initialList = [
      {
        id: 'CUST-2345',
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
        id: 'CUST-8392',
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
        id: 'CUST-6201',
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
        id: 'CUST-4912',
        name: 'Vikram Patil',
        phone: '+91 98860 44912',
        email: 'vikram.patil@techhub.in',
        ordersCount: 12,
        ltv: 3890,
        lastVisited: '2 days ago',
        favoriteCategory: 'Brews',
        segment: 'Cold Brew Lovers',
      },
    ];

    initialList.forEach((c) => {
      if (!map.has(c.phone)) {
        map.set(c.phone, c);
      }
    });

    return Array.from(map.values());
  }, [orders]);

  return (
    <StoreContext.Provider
      value={{
        menuItems,
        orders,
        customers,
        toggleItemAvailability,
        updateItemPrice,
        toggleDailySpecial,
        placeOrder,
        updateOrderStatus,
        showToast,
        toastMessage,
      }}
    >
      {children}
      {/* Universal Floating Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[99999] bg-[#18181A] text-[#FAF7F2] border border-[#E8998D]/50 px-5 py-3 rounded-2xl shadow-2xl font-mono text-xs flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <span className="w-2 h-2 rounded-full bg-[#E8998D] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}
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
