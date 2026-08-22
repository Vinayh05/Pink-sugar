'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getOrders,
  advanceOrderStatus as advanceOrderStatusService,
  getInventory,
  updateInventoryItem,
  getCustomers,
  getAdminConfig,
  saveAdminConfig as saveAdminConfigService,
  subscribeToOrders,
  subscribeToInventory,
  subscribeToAdminConfig,
} from '../services/dataService';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // Orders State
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [adminConfig, setAdminConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRealtimeActive, setIsRealtimeActive] = useState(false);

  // Toast System for Admin
  const [toastMessage, setToastMessage] = useState(null);

  const showAdminToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 3000);
  };

  // Initial Fetch from Data Service Layer
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [ordersRes, inventoryRes, customersRes, configRes] = await Promise.all([
        getOrders(),
        getInventory(),
        getCustomers(),
        getAdminConfig(),
      ]);

      if (ordersRes.data) setOrders(ordersRes.data);
      if (inventoryRes.data) setInventory(inventoryRes.data);
      if (customersRes.data) setCustomers(customersRes.data);
      if (configRes.data) setAdminConfig(configRes.data);
    } catch (err) {
      console.warn('[AdminContext] Error fetching initial data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial Load + Realtime WebSockets Channel Subscriptions
  useEffect(() => {
    fetchData();

    // 1. Subscribe to Live Orders Channel
    const unsubscribeOrders = subscribeToOrders((payload) => {
      setIsRealtimeActive(true);
      if (payload.eventType === 'INSERT' && payload.new) {
        setOrders((prev) => [payload.new, ...prev.filter((o) => o.id !== payload.new.id)]);
        showAdminToast(`🔔 New Live Order received: #${payload.new.id}`);
      } else if (payload.eventType === 'UPDATE' && payload.new) {
        setOrders((prev) =>
          prev.map((o) => (o.id === payload.new.id ? { ...o, ...payload.new } : o))
        );
      }
    });

    // 2. Subscribe to Live Inventory Channel
    const unsubscribeInventory = subscribeToInventory((payload) => {
      setIsRealtimeActive(true);
      if (payload.eventType === 'UPDATE' && payload.new) {
        setInventory((prev) =>
          prev.map((i) => (i.id === payload.new.id ? { ...i, ...payload.new } : i))
        );
        showAdminToast(`⚡ Menu inventory synced: ${payload.new.name || 'Item'}`);
      }
    });

    // 3. Subscribe to Store Operations Config Channel
    const unsubscribeConfig = subscribeToAdminConfig((newConfig) => {
      setIsRealtimeActive(true);
      setAdminConfig((prev) => ({ ...prev, ...newConfig }));
      showAdminToast('⚙️ Store operational configuration updated live');
    });

    return () => {
      unsubscribeOrders();
      unsubscribeInventory();
      unsubscribeConfig();
    };
  }, [fetchData]);

  // Move Order to Next Pipeline Stage via Data Service
  const advanceOrderStatus = async (orderId) => {
    const currentOrder = orders.find((o) => o.id === orderId);
    if (!currentOrder) return;

    let nextStatus = currentOrder.status;
    if (currentOrder.status === 'received') nextStatus = 'preparing';
    else if (currentOrder.status === 'preparing') nextStatus = 'ready';
    else if (currentOrder.status === 'ready') nextStatus = 'completed';

    // Optimistic UI update
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: nextStatus } : order))
    );

    showAdminToast(`Order ${orderId} moved to ${nextStatus.toUpperCase()}`);

    // Persist to Supabase service layer
    await advanceOrderStatusService(orderId, nextStatus);
  };

  // Toggle Item Stock Status via Data Service
  const toggleItemStock = async (itemId) => {
    const item = inventory.find((i) => i.id === itemId);
    if (!item) return;

    const nextState = !item.inStock;

    // Optimistic UI update
    setInventory((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, inStock: nextState } : i))
    );

    showAdminToast(`${item.name} marked as ${nextState ? 'IN STOCK' : 'SOLD OUT'}`);

    // Persist to Supabase service layer
    await updateInventoryItem(itemId, { inStock: nextState });
  };

  // Toggle Daily Special Flag via Data Service
  const toggleItemSpecial = async (itemId) => {
    const item = inventory.find((i) => i.id === itemId);
    if (!item) return;

    const nextState = !item.isSpecial;

    // Optimistic UI update
    setInventory((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, isSpecial: nextState } : i))
    );

    showAdminToast(`${item.name} ${nextState ? 'pinned to Daily Specials' : 'unpinned'}`);

    // Persist to Supabase service layer
    await updateInventoryItem(itemId, { isSpecial: nextState });
  };

  // Update Item Price Inline via Data Service
  const updateItemPrice = async (itemId, newPrice) => {
    const numPrice = Number(newPrice);
    if (isNaN(numPrice) || numPrice <= 0) return;

    // Optimistic UI update
    setInventory((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, price: numPrice } : item))
    );

    showAdminToast(`Price updated to ₹${numPrice}`);

    // Persist to Supabase service layer
    await updateInventoryItem(itemId, { price: numPrice });
  };

  // Save Admin Configuration via Data Service
  const saveAdminConfig = async (newConfig) => {
    setAdminConfig((prev) => ({ ...prev, ...newConfig }));
    showAdminToast('Admin configuration saved.');
    await saveAdminConfigService(newConfig);
  };

  return (
    <AdminContext.Provider
      value={{
        orders,
        inventory,
        customers,
        adminConfig,
        isLoading,
        isRealtimeActive,
        advanceOrderStatus,
        toggleItemStock,
        toggleItemSpecial,
        updateItemPrice,
        saveAdminConfig,
        showAdminToast,
        toastMessage,
        refreshData: fetchData,
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
