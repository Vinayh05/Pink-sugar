-- =============================================================================
-- PINK SUGAR CAFE - SUPABASE POSTGRESQL SCHEMA & REALTIME SETUP
-- Run this script in the Supabase SQL Editor (https://supabase.com/dashboard)
-- =============================================================================

-- 1. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
    id TEXT PRIMARY KEY DEFAULT ('rev-' || floor(extract(epoch from now()) * 1000)::text),
    author TEXT NOT NULL,
    tag TEXT DEFAULT 'Verified Diner',
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    dish TEXT NOT NULL,
    text TEXT NOT NULL,
    date TEXT DEFAULT 'Recent',
    coords JSONB DEFAULT '{"top": "20%", "left": "15%", "rotate": "0deg"}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. LIVE ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    customer JSONB NOT NULL,
    type TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    items JSONB NOT NULL,
    notes TEXT,
    total NUMERIC NOT NULL,
    status TEXT DEFAULT 'received' CHECK (status IN ('received', 'preparing', 'ready', 'completed')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. MENU INVENTORY TABLE
CREATE TABLE IF NOT EXISTS public.inventory (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC NOT NULL,
    category TEXT NOT NULL,
    "inStock" BOOLEAN DEFAULT true,
    "isSpecial" BOOLEAN DEFAULT false,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. CUSTOMER CRM TABLE
CREATE TABLE IF NOT EXISTS public.customers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    "ordersCount" INTEGER DEFAULT 1,
    ltv NUMERIC DEFAULT 0,
    "lastVisited" TEXT DEFAULT 'Recently',
    "favoriteCategory" TEXT,
    segment TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. ADMIN CONFIGURATION TABLE
CREATE TABLE IF NOT EXISTS public.admin_config (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =============================================================================
-- ENABLE ROW LEVEL SECURITY (RLS) & PUBLIC ACCESS POLICIES
-- =============================================================================

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_config ENABLE ROW LEVEL SECURITY;

-- Allow read and write for demo/anon users
CREATE POLICY "Allow public read on reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Allow public insert on reviews" ON public.reviews FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Allow public all on orders" ON public.orders FOR ALL USING (true);

CREATE POLICY "Allow public read on inventory" ON public.inventory FOR SELECT USING (true);
CREATE POLICY "Allow public all on inventory" ON public.inventory FOR ALL USING (true);

CREATE POLICY "Allow public read on customers" ON public.customers FOR SELECT USING (true);
CREATE POLICY "Allow public all on customers" ON public.customers FOR ALL USING (true);

CREATE POLICY "Allow public read on admin_config" ON public.admin_config FOR SELECT USING (true);
CREATE POLICY "Allow public all on admin_config" ON public.admin_config FOR ALL USING (true);

-- =============================================================================
-- ENABLE SUPABASE REALTIME REPLICATION FOR INSTANT WEBSOCKET PUSH
-- =============================================================================

ALTER PUBLICATION supabase_realtime ADD TABLE public.reviews;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.inventory;
ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_config;
