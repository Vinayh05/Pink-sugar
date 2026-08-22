'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getInventory,
  updateInventoryItem,
  getOrders,
  createOrder as createOrderService,
  advanceOrderStatus as advanceOrderStatusService,
  getCustomers,
  subscribeToInventory,
  subscribeToOrders,
} from '../services/dataService';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial data from Supabase Service Layer
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [invRes, ordRes, custRes] = await Promise.all([
        getInventory(),
        getOrders(),
        getCustomers(),
      ]);

      if (invRes.data) setMenuItems(invRes.data);
      if (ordRes.data) setOrders(ordRes.data);
      if (custRes.data) setCustomers(custRes.data);
    } catch (e) {
      console.warn('[StoreContext] Failed fetching initial data:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Mount Supabase Realtime WebSocket Subscriptions for Live Cross-Device Sync
  useEffect(() => {
    fetchData();

    // 1. Live Menu & Inventory Channel Subscription
    const unsubscribeInventory = subscribeToInventory((payload) => {
      if (payload.eventType === 'UPDATE' && payload.new) {
        setMenuItems((prev) =>
          prev.map((item) => {
            if (String(item.id) === String(payload.new.id)) {
              const inStock = payload.new.inStock !== false;
              const isSpecial = payload.new.isSpecial === true;
              const price = Number(payload.new.price) || item.price;
              return {
                ...item,
                price,
                inStock,
                isAvailable: inStock,
                isSpecial,
              };
            }
            return item;
          })
        );
      }
    });

    // 2. Live Orders Channel Subscription
    const unsubscribeOrders = subscribeToOrders((payload) => {
      if (payload.eventType === 'INSERT' && payload.new) {
        setOrders((prev) => [payload.new, ...prev.filter((o) => o.id !== payload.new.id)]);
        showToast(`🔔 New Order received: #${payload.new.id}`);
      } else if (payload.eventType === 'UPDATE' && payload.new) {
        setOrders((prev) =>
          prev.map((order) => (order.id === payload.new.id ? { ...order, ...payload.new } : order))
        );
      }
    });

    return () => {
      unsubscribeInventory();
      unsubscribeOrders();
    };
  }, [fetchData]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 3500);
  };

  // Actions for Menu & Inventory -> Writes directly to Supabase
  const toggleItemAvailability = async (itemId) => {
    const item = menuItems.find((i) => String(i.id) === String(itemId));
    if (!item) return;

    const nextState = !item.isAvailable;

    // Optimistic UI update
    setMenuItems((prev) =>
      prev.map((i) =>
        String(i.id) === String(itemId) ? { ...i, isAvailable: nextState, inStock: nextState } : i
      )
    );

    showToast(`${item.name} is now ${nextState ? 'AVAILABLE' : 'SOLD OUT'}`);

    // Persist to Supabase database
    await updateInventoryItem(itemId, { inStock: nextState, isAvailable: nextState });
  };

  const updateItemPrice = async (itemId, newPrice) => {
    const numPrice = Number(newPrice);
    if (isNaN(numPrice) || numPrice <= 0) return;

    // Optimistic UI update
    setMenuItems((prev) =>
      prev.map((item) => (String(item.id) === String(itemId) ? { ...item, price: numPrice } : item))
    );

    showToast(`Price updated to ₹${numPrice}`);

    // Persist to Supabase database
    await updateInventoryItem(itemId, { price: numPrice });
  };

  const toggleDailySpecial = async (itemId) => {
    const item = menuItems.find((i) => String(i.id) === String(itemId));
    if (!item) return;

    const nextState = !item.isSpecial;

    // Optimistic UI update
    setMenuItems((prev) =>
      prev.map((i) => (String(i.id) === String(itemId) ? { ...i, isSpecial: nextState } : i))
    );

    showToast(`${item.name} ${nextState ? 'pinned to Daily Specials' : 'unpinned'}`);

    // Persist to Supabase database
    await updateInventoryItem(itemId, { isSpecial: nextState });
  };

  // Actions for Orders -> Writes directly to Supabase
  const placeOrder = async (orderData) => {
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

    // Optimistic UI update
    setOrders((prev) => [newTicket, ...prev]);
    showToast(`Order #${newTicket.id} confirmed! Sent directly to stone hearth kitchen.`);

    // Persist to Supabase database
    await createOrderService(newTicket);
    return newTicket;
  };

  const updateOrderStatus = async (orderId, nextStatus) => {
    // Optimistic UI update
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: nextStatus } : order))
    );

    showToast(`Order ${orderId} moved to ${nextStatus.toUpperCase()}`);

    // Persist to Supabase database
    await advanceOrderStatusService(orderId, nextStatus);
  };

  return (
    <StoreContext.Provider
      value={{
        menuItems,
        orders,
        customers,
        isLoading,
        toggleItemAvailability,
        updateItemPrice,
        toggleDailySpecial,
        placeOrder,
        updateOrderStatus,
        showToast,
        toastMessage,
        refreshData: fetchData,
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
