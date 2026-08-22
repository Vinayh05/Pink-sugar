'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  INITIAL_MENU,
  DEFAULT_ORDERS,
  DEFAULT_CUSTOMERS,
  getInventory,
  updateInventoryItem as updateInventoryItemService,
  getOrders,
  createOrder as createOrderService,
  advanceOrderStatus as advanceOrderStatusService,
  getCustomers,
  subscribeToInventory,
  subscribeToOrders,
} from '../services/dataService.js';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState(INITIAL_MENU);
  const [orders, setOrders] = useState(DEFAULT_ORDERS);
  const [customers, setCustomers] = useState(DEFAULT_CUSTOMERS);
  const [toastMessage, setToastMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch live snapshot from Supabase on mount
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [invRes, ordRes, custRes] = await Promise.all([
        getInventory(),
        getOrders(),
        getCustomers(),
      ]);

      if (invRes.data && invRes.data.length > 0) setMenuItems(invRes.data);
      if (ordRes.data && ordRes.data.length > 0) setOrders(ordRes.data);
      if (custRes.data && custRes.data.length > 0) setCustomers(custRes.data);
    } catch (e) {
      console.warn('[StoreContext] Fetch warning:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 2. Realtime WebSocket + BroadcastBus Subscriptions
  useEffect(() => {
    fetchData();

    // Live Inventory Channel Listener
    const unsubscribeInventory = subscribeToInventory((payload) => {
      const updatedRow = payload.new || payload;
      if (!updatedRow || !updatedRow.id) return;

      const strId = String(updatedRow.id);

      setMenuItems((prevItems) =>
        prevItems.map((item) => {
          if (String(item.id) === strId) {
            // Determine stock availability
            let inStock = item.inStock;
            if (updatedRow.inStock !== undefined) inStock = updatedRow.inStock !== false;
            else if (updatedRow.isAvailable !== undefined) inStock = updatedRow.isAvailable !== false;
            else if (updatedRow.instock !== undefined) inStock = updatedRow.instock !== false;

            // Determine special flag
            let isSpecial = item.isSpecial;
            if (updatedRow.isSpecial !== undefined) isSpecial = updatedRow.isSpecial === true;
            else if (updatedRow.isspecial !== undefined) isSpecial = updatedRow.isspecial === true;

            // Determine price
            const price = updatedRow.price !== undefined ? Number(updatedRow.price) : item.price;

            return {
              ...item,
              inStock,
              isAvailable: inStock,
              isSpecial,
              price: isNaN(price) ? item.price : price,
            };
          }
          return item;
        })
      );
    });

    // Live Orders Channel Listener
    const unsubscribeOrders = subscribeToOrders((payload) => {
      const order = payload.new || payload;
      if (!order || !order.id) return;

      if (payload.eventType === 'INSERT' || !orders.some((o) => o.id === order.id)) {
        setOrders((prev) => [order, ...prev.filter((o) => o.id !== order.id)]);
        showToast(`🔔 New Live Order: #${order.id}`);
      } else {
        setOrders((prev) =>
          prev.map((o) => (o.id === order.id ? { ...o, ...order } : o))
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

  // Actions for Menu & Inventory -> Writes directly to Supabase & triggers Instant Broadcast
  const toggleItemAvailability = async (itemId) => {
    const strId = String(itemId);
    const item = menuItems.find((i) => String(i.id) === strId);
    if (!item) return;

    const nextState = !item.isAvailable;

    // Optimistic UI update
    setMenuItems((prev) =>
      prev.map((i) =>
        String(i.id) === strId ? { ...i, isAvailable: nextState, inStock: nextState } : i
      )
    );

    showToast(`${item.name} is now ${nextState ? 'AVAILABLE' : 'SOLD OUT'}`);

    // Persist to Supabase database & Broadcast
    await updateInventoryItemService(itemId, { inStock: nextState, isAvailable: nextState });
  };

  const updateItemPrice = async (itemId, newPrice) => {
    const strId = String(itemId);
    const numPrice = Number(newPrice);
    if (isNaN(numPrice) || numPrice <= 0) return;

    // Optimistic UI update
    setMenuItems((prev) =>
      prev.map((item) => (String(item.id) === strId ? { ...item, price: numPrice } : item))
    );

    showToast(`Price updated to ₹${numPrice}`);

    // Persist to Supabase database & Broadcast
    await updateInventoryItemService(itemId, { price: numPrice });
  };

  const toggleDailySpecial = async (itemId) => {
    const strId = String(itemId);
    const item = menuItems.find((i) => String(i.id) === strId);
    if (!item) return;

    const nextState = !item.isSpecial;

    // Optimistic UI update
    setMenuItems((prev) =>
      prev.map((i) => (String(i.id) === strId ? { ...i, isSpecial: nextState } : i))
    );

    showToast(`${item.name} ${nextState ? 'pinned to Daily Specials' : 'unpinned'}`);

    // Persist to Supabase database & Broadcast
    await updateInventoryItemService(itemId, { isSpecial: nextState });
  };

  // Actions for Orders -> Writes directly to Supabase & triggers Instant Broadcast
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

    // Persist to Supabase database & Broadcast
    await createOrderService(newTicket);
    return newTicket;
  };

  const updateOrderStatus = async (orderId, nextStatus) => {
    // Optimistic UI update
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: nextStatus } : order))
    );

    showToast(`Order ${orderId} moved to ${nextStatus.toUpperCase()}`);

    // Persist to Supabase database & Broadcast
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
