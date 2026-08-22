/**
 * @file dataService.js
 * @description Dedicated Data Layer Abstraction for Pink Sugar Cafe.
 * Exposes clean, typed asynchronous helper functions to read and write to Supabase
 * with seamless fallback to local mock data to prevent UI crashes.
 * Includes Dual-Layer Realtime Sync (Supabase PostgreSQL WebSocket Channels + Browser BroadcastChannel).
 */

import { getSupabaseClient } from '../lib/supabaseClient.js';
import { MENU_DATA } from '../data/menuData.js';

/**
 * @typedef {Object} Review
 * @property {string|number} id
 * @property {string} author
 * @property {string} tag
 * @property {number} rating
 * @property {string} date
 * @property {string} dish
 * @property {string} text
 * @property {Object} [coords]
 */

/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {Object} customer
 * @property {string} type
 * @property {string} timestamp
 * @property {Array} items
 * @property {string} notes
 * @property {number} total
 * @property {'received'|'preparing'|'ready'|'completed'|'in_kitchen'} status
 */

/**
 * @typedef {Object} InventoryItem
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {string} category
 * @property {boolean} inStock
 * @property {boolean} isSpecial
 */

export const INITIAL_MENU = MENU_DATA.map((item) => ({
  ...item,
  inStock: true,
  isAvailable: true,
  isSpecial: item.featured || false,
}));

export const DEFAULT_REVIEWS = [
  {
    id: 'rev-01',
    author: 'Ananya Deshmukh',
    tag: 'Local Guide • 42 reviews',
    rating: 5,
    date: '2 weeks ago',
    dish: 'Signature Pink Sauce Penne',
    text: 'The best pink sauce pasta in Hubballi! The ambience feels like a boutique European cafe. The pink sugar cold brew is a must-try.',
    coords: { top: '12%', left: '8%', rotate: '-2deg' },
  },
  {
    id: 'rev-02',
    author: 'Rohit Kulkarni',
    tag: 'Verified Diner',
    rating: 5,
    date: 'a month ago',
    dish: 'Blistered Margherita Pizza',
    text: 'Authentic 36-hour fermented sourdough crust. Blistered to perfection with fresh mozzarella. Truly artisanal!',
    coords: { top: '18%', right: '10%', rotate: '2.5deg' },
  },
  {
    id: 'rev-03',
    author: 'Priya Patil',
    tag: 'Local Guide • 18 reviews',
    rating: 5,
    date: '3 weeks ago',
    dish: 'Pink Sugar Velvet Cold Brew',
    text: 'That silky pink sugar sweet cream over cold brew is revolutionary. Smooth, rich, and never bitter.',
    coords: { top: '45%', left: '18%', rotate: '1deg' },
  },
  {
    id: 'rev-04',
    author: 'Siddharth Hegde',
    tag: 'Verified Diner',
    rating: 5,
    date: '2 months ago',
    dish: 'Golden Butter Croissant',
    text: 'Flaky, buttery layers that shatter with every bite. Pairing it with the flat white is my weekly ritual.',
    coords: { top: '42%', right: '16%', rotate: '-3deg' },
  },
  {
    id: 'rev-05',
    author: 'Kavya Joshi',
    tag: 'Food Enthusiast',
    rating: 5,
    date: '5 days ago',
    dish: 'Baked Blueberry Cheesecake',
    text: 'Not overly sweet, dense baked custard with real whole blueberries. Hands down the finest dessert spot in town.',
    coords: { bottom: '14%', left: '12%', rotate: '2deg' },
  },
  {
    id: 'rev-06',
    author: 'Vikram Shenoy',
    tag: 'Verified Diner',
    rating: 5,
    date: 'Just yesterday',
    dish: 'Charred Truffle Mushroom',
    text: 'The stone hearth flavor is unmatched. Great music, warm staff, and world-class craft coffee.',
    coords: { bottom: '10%', right: '12%', rotate: '-1.5deg' },
  },
];

export const DEFAULT_ORDERS = [
  {
    id: 'PS-1042',
    customer: { name: 'Aditi Deshmukh', phone: '+91 98450 12345', email: 'aditi.deshmukh@gmail.com' },
    customerName: 'Aditi Deshmukh',
    customerPhone: '+91 98450 12345',
    customerEmail: 'aditi.deshmukh@gmail.com',
    tableOrTakeaway: 'Dine-in: Table 04',
    type: 'Dine-in: Table 04',
    timestamp: '10 mins ago',
    items: [
      { name: 'Signature Pink Sauce Penne', qty: 2, price: 340 },
      { name: 'Pink Salt Velvet Cold Brew', qty: 2, price: 280 },
    ],
    notes: 'Extra cracked Himalayan salt on pasta, less ice in cold brew.',
    total: 1240,
    status: 'received',
  },
  {
    id: 'PS-1041',
    customer: { name: 'Rohit Kulkarni', phone: '+91 97412 88392', email: 'rohit.k@yahoo.com' },
    customerName: 'Rohit Kulkarni',
    customerPhone: '+91 97412 88392',
    customerEmail: 'rohit.k@yahoo.com',
    tableOrTakeaway: 'Takeaway Pickup',
    type: 'Takeaway',
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
    customer: { name: 'Priya Patil', phone: '+91 94480 66201', email: 'priya.patil@outlook.com' },
    customerName: 'Priya Patil',
    customerPhone: '+91 94480 66201',
    customerEmail: 'priya.patil@outlook.com',
    tableOrTakeaway: 'Dine-in: Table 02',
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
    customer: { name: 'Vikram Shenoy', phone: '+91 98860 44912', email: 'vikram.shenoy@corp.in' },
    customerName: 'Vikram Shenoy',
    customerPhone: '+91 98860 44912',
    customerEmail: 'vikram.shenoy@corp.in',
    tableOrTakeaway: 'Dine-in: Table 06',
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

export const DEFAULT_CUSTOMERS = [
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
];

let localReviewsCache = [...DEFAULT_REVIEWS];
let localOrdersCache = [...DEFAULT_ORDERS];
let localInventoryCache = [...INITIAL_MENU];
let localAdminConfig = {
  cafeStatus: 'open',
  hearthActive: true,
  onlineOrdering: true,
  dailyNotice: 'Hearth roaring daily from 8:00 AM. 36h wild ferment batch ready.',
};

// =========================================================================
// 0. BROADCAST CHANNEL UTILITIES (Instant zero-latency cross-tab sync)
// =========================================================================

const broadcastSync = (type, payload) => {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    try {
      const bc = new BroadcastChannel('pink_sugar_realtime_bus');
      bc.postMessage({ type, payload, timestamp: Date.now() });
      bc.close();
    } catch (e) {
      // Ignore broadcast errors
    }
  }
};

/* =========================================================================
   1. REVIEWS SERVICE API
   ========================================================================= */

export const getReviews = async () => {
  const client = getSupabaseClient();
  if (!client) {
    return { data: localReviewsCache, error: null };
  }

  try {
    const { data, error } = await client
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return { data: localReviewsCache, error: null };
    }

    return { data, error: null };
  } catch (err) {
    return { data: localReviewsCache, error: null };
  }
};

export const addReview = async (review) => {
  const newReview = {
    id: `rev-${Date.now()}`,
    ...review,
    date: 'Just now',
    coords: {
      top: `${20 + Math.floor(Math.random() * 40)}%`,
      left: `${10 + Math.floor(Math.random() * 60)}%`,
      rotate: `${(Math.random() * 4 - 2).toFixed(1)}deg`,
    },
  };

  localReviewsCache = [newReview, ...localReviewsCache];
  broadcastSync('REVIEW_ADD', newReview);

  const client = getSupabaseClient();
  if (!client) {
    return { data: newReview, error: null };
  }

  try {
    const { data, error } = await client.from('reviews').insert([newReview]).select();
    return { data: data?.[0] || newReview, error: null };
  } catch (err) {
    return { data: newReview, error: null };
  }
};

/* =========================================================================
   2. ORDERS & PIPELINE SERVICE API
   ========================================================================= */

export const getOrders = async () => {
  const client = getSupabaseClient();
  if (!client) {
    return { data: localOrdersCache, error: null };
  }

  try {
    const { data, error } = await client
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return { data: localOrdersCache, error: null };
    }

    const mapped = data.map((d) => ({
      ...d,
      customerName: d.customer?.name || d.customerName || 'Guest Patron',
      customerPhone: d.customer?.phone || d.customerPhone || '',
      customerEmail: d.customer?.email || d.customerEmail || '',
      tableOrTakeaway: d.type || d.tableOrTakeaway || 'Dine-in',
    }));

    return { data: mapped, error: null };
  } catch (err) {
    return { data: localOrdersCache, error: null };
  }
};

export const createOrder = async (orderData) => {
  const newOrder = {
    id: orderData.id || `PS-${Math.floor(1000 + Math.random() * 9000)}`,
    customer: {
      name: orderData.customerName || orderData.customer?.name || 'Guest Patron',
      phone: orderData.customerPhone || orderData.customer?.phone || '+91 98765 43210',
      email: orderData.customerEmail || orderData.customer?.email || 'patron@pinksalt.com',
    },
    type: orderData.tableOrTakeaway || orderData.type || 'Dine-in Table',
    timestamp: 'Just now',
    items: orderData.items || [],
    notes: orderData.notes || '',
    total: Number(orderData.total || 0),
    status: orderData.status || 'received',
  };

  const clientOrder = {
    ...newOrder,
    customerName: newOrder.customer.name,
    customerPhone: newOrder.customer.phone,
    customerEmail: newOrder.customer.email,
    tableOrTakeaway: newOrder.type,
  };

  localOrdersCache = [clientOrder, ...localOrdersCache];
  broadcastSync('ORDER_CREATE', clientOrder);

  const client = getSupabaseClient();
  if (!client) {
    return { data: clientOrder, error: null };
  }

  try {
    await client.from('orders').insert([newOrder]);
    return { data: clientOrder, error: null };
  } catch (err) {
    return { data: clientOrder, error: null };
  }
};

export const advanceOrderStatus = async (orderId, nextStatus) => {
  localOrdersCache = localOrdersCache.map((order) =>
    order.id === orderId ? { ...order, status: nextStatus } : order
  );
  broadcastSync('ORDER_UPDATE', { id: orderId, status: nextStatus });

  const client = getSupabaseClient();
  if (!client) {
    return { data: localOrdersCache.find((o) => o.id === orderId) || null, error: null };
  }

  try {
    const { data, error } = await client
      .from('orders')
      .update({ status: nextStatus })
      .eq('id', orderId)
      .select();

    return { data: data?.[0] || null, error };
  } catch (err) {
    return { data: null, error: err.message };
  }
};

/* =========================================================================
   3. INVENTORY & MENU STATUS SERVICE API
   ========================================================================= */

export const getInventory = async () => {
  const client = getSupabaseClient();
  if (!client) {
    return { data: localInventoryCache, error: null };
  }

  try {
    const { data, error } = await client.from('inventory').select('*');
    if (error || !data || data.length === 0) {
      return { data: localInventoryCache, error: null };
    }

    const merged = MENU_DATA.map((masterItem) => {
      const dbRow = data.find((d) => String(d.id) === String(masterItem.id));
      if (!dbRow) return { ...masterItem, inStock: true, isAvailable: true, isSpecial: masterItem.featured || false };

      const inStock = dbRow.inStock !== false;
      const isSpecial = dbRow.isSpecial === true;
      const price = Number(dbRow.price) || masterItem.price;

      return {
        ...masterItem,
        price,
        inStock,
        isAvailable: inStock,
        isSpecial,
      };
    });

    return { data: merged, error: null };
  } catch (err) {
    return { data: localInventoryCache, error: null };
  }
};

export const updateInventoryItem = async (itemId, updates) => {
  const strId = String(itemId);
  localInventoryCache = localInventoryCache.map((item) =>
    String(item.id) === strId ? { ...item, ...updates } : item
  );

  // Broadcast instantly to all same-browser tabs/windows
  broadcastSync('INVENTORY_UPDATE', { id: strId, ...updates });

  const client = getSupabaseClient();
  if (!client) {
    return { data: localInventoryCache.find((i) => String(i.id) === strId) || null, error: null };
  }

  try {
    const dbPayload = {};
    if (updates.inStock !== undefined) dbPayload.inStock = updates.inStock;
    if (updates.isAvailable !== undefined) dbPayload.inStock = updates.isAvailable;
    if (updates.isSpecial !== undefined) dbPayload.isSpecial = updates.isSpecial;
    if (updates.price !== undefined) dbPayload.price = Number(updates.price);

    const { data, error } = await client
      .from('inventory')
      .update(dbPayload)
      .eq('id', strId)
      .select();

    return { data: data?.[0] || null, error };
  } catch (err) {
    return { data: null, error: err.message };
  }
};

/* =========================================================================
   4. CUSTOMER CRM SERVICE API
   ========================================================================= */

export const getCustomers = async () => {
  const client = getSupabaseClient();
  if (!client) {
    return { data: DEFAULT_CUSTOMERS, error: null };
  }

  try {
    const { data, error } = await client.from('customers').select('*');
    if (error || !data || data.length === 0) {
      return { data: DEFAULT_CUSTOMERS, error: null };
    }
    return { data, error: null };
  } catch (err) {
    return { data: DEFAULT_CUSTOMERS, error: null };
  }
};

/* =========================================================================
   5. ADMIN STORE CONFIGURATION SERVICE API
   ========================================================================= */

export const getAdminConfig = async () => {
  const client = getSupabaseClient();
  if (!client) {
    return { data: localAdminConfig, error: null };
  }

  try {
    const { data, error } = await client
      .from('admin_config')
      .select('*')
      .eq('key', 'main_config')
      .single();

    if (error || !data) {
      return { data: localAdminConfig, error: null };
    }
    return { data: data.value, error: null };
  } catch (err) {
    return { data: localAdminConfig, error: null };
  }
};

export const saveAdminConfig = async (config) => {
  localAdminConfig = { ...localAdminConfig, ...config };
  broadcastSync('ADMIN_CONFIG_UPDATE', config);

  const client = getSupabaseClient();
  if (!client) {
    return { data: localAdminConfig, error: null };
  }

  try {
    const { data, error } = await client
      .from('admin_config')
      .upsert({ key: 'main_config', value: localAdminConfig })
      .select();

    return { data: data?.[0] || localAdminConfig, error };
  } catch (err) {
    return { data: localAdminConfig, error: err.message };
  }
};

/* =========================================================================
   6. DUAL-LAYER REALTIME WEBSOCKET & BROADCAST BUS
   ========================================================================= */

export const subscribeToInventory = (callback) => {
  let bc = null;
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    try {
      bc = new BroadcastChannel('pink_sugar_realtime_bus');
      bc.onmessage = (event) => {
        if (event.data?.type === 'INVENTORY_UPDATE' && event.data.payload) {
          callback({ eventType: 'UPDATE', new: event.data.payload });
        }
      };
    } catch (e) {}
  }

  const client = getSupabaseClient();
  let channel = null;
  if (client) {
    try {
      channel = client
        .channel(`realtime_inventory_${Math.random().toString(36).substring(2, 7)}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'inventory' },
          (payload) => {
            callback(payload);
          }
        )
        .subscribe();
    } catch (err) {
      console.warn('[Supabase Realtime] Error on inventory channel:', err);
    }
  }

  return () => {
    if (bc) {
      try {
        bc.close();
      } catch (e) {}
    }
    if (client && channel) {
      try {
        client.removeChannel(channel);
      } catch (e) {}
    }
  };
};

export const subscribeToOrders = (callback) => {
  let bc = null;
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    try {
      bc = new BroadcastChannel('pink_sugar_realtime_bus');
      bc.onmessage = (event) => {
        if (event.data?.type === 'ORDER_CREATE') {
          callback({ eventType: 'INSERT', new: event.data.payload });
        } else if (event.data?.type === 'ORDER_UPDATE') {
          callback({ eventType: 'UPDATE', new: event.data.payload });
        }
      };
    } catch (e) {}
  }

  const client = getSupabaseClient();
  let channel = null;
  if (client) {
    try {
      channel = client
        .channel(`realtime_orders_${Math.random().toString(36).substring(2, 7)}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'orders' },
          (payload) => {
            callback(payload);
          }
        )
        .subscribe();
    } catch (err) {}
  }

  return () => {
    if (bc) {
      try {
        bc.close();
      } catch (e) {}
    }
    if (client && channel) {
      try {
        client.removeChannel(channel);
      } catch (e) {}
    }
  };
};

export const subscribeToReviews = (callback) => {
  let bc = null;
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    try {
      bc = new BroadcastChannel('pink_sugar_realtime_bus');
      bc.onmessage = (event) => {
        if (event.data?.type === 'REVIEW_ADD' && event.data.payload) {
          callback(event.data.payload);
        }
      };
    } catch (e) {}
  }

  const client = getSupabaseClient();
  let channel = null;
  if (client) {
    try {
      channel = client
        .channel(`realtime_reviews_${Math.random().toString(36).substring(2, 7)}`)
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'reviews' },
          (payload) => {
            if (payload.new) callback(payload.new);
          }
        )
        .subscribe();
    } catch (err) {}
  }

  return () => {
    if (bc) {
      try {
        bc.close();
      } catch (e) {}
    }
    if (client && channel) {
      try {
        client.removeChannel(channel);
      } catch (e) {}
    }
  };
};

export const subscribeToAdminConfig = (callback) => {
  let bc = null;
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    try {
      bc = new BroadcastChannel('pink_sugar_realtime_bus');
      bc.onmessage = (event) => {
        if (event.data?.type === 'ADMIN_CONFIG_UPDATE' && event.data.payload) {
          callback(event.data.payload);
        }
      };
    } catch (e) {}
  }

  const client = getSupabaseClient();
  let channel = null;
  if (client) {
    try {
      channel = client
        .channel(`realtime_admin_config_${Math.random().toString(36).substring(2, 7)}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'admin_config' },
          (payload) => {
            if (payload.new && payload.new.value) callback(payload.new.value);
          }
        )
        .subscribe();
    } catch (err) {}
  }

  return () => {
    if (bc) {
      try {
        bc.close();
      } catch (e) {}
    }
    if (client && channel) {
      try {
        client.removeChannel(channel);
      } catch (e) {}
    }
  };
};
