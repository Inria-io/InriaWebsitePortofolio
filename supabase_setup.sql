-- SQL Setup Script for Supabase Database
-- Go to your Supabase Dashboard -> SQL Editor -> New Query, paste this script, and run it.

-- 1. Create Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  github_url TEXT,
  live_url TEXT,
  report_url TEXT,
  report_title TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  featured BOOLEAN DEFAULT FALSE
);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access to projects
DROP POLICY IF EXISTS "Allow public read access" ON projects;
CREATE POLICY "Allow public read access" ON projects
  FOR SELECT USING (true);

-- Allow authenticated/admin write access (for future dashboard)
DROP POLICY IF EXISTS "Allow admin write access" ON projects;
CREATE POLICY "Allow admin write access" ON projects
  FOR ALL TO authenticated USING (true);


-- 2. Create Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published posts
DROP POLICY IF EXISTS "Allow public read access to published posts" ON blog_posts;
CREATE POLICY "Allow public read access to published posts" ON blog_posts
  FOR SELECT USING (published = true);

-- Allow authenticated/admin write access
DROP POLICY IF EXISTS "Allow admin write access" ON blog_posts;
CREATE POLICY "Allow admin write access" ON blog_posts
  FOR ALL TO authenticated USING (true);


-- 3. Create Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert contact messages (public submit)
DROP POLICY IF EXISTS "Allow public insert messages" ON contact_messages;
CREATE POLICY "Allow public insert messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Allow only authenticated admin to read/manage messages
DROP POLICY IF EXISTS "Allow admin read messages" ON contact_messages;
CREATE POLICY "Allow admin read messages" ON contact_messages
  FOR ALL TO authenticated USING (true);

-- 4. Grant permissions to API roles (anon & authenticated)
GRANT SELECT ON TABLE public.projects TO anon, authenticated;
GRANT SELECT ON TABLE public.blog_posts TO anon, authenticated;
GRANT INSERT ON TABLE public.contact_messages TO anon, authenticated;


-- ==========================================
-- SEED DATA (Optional)
-- Run this if you want to populate your database with initial showcase items!
-- ==========================================

INSERT INTO projects (title, slug, description, content, tags, featured, github_url, live_url)
VALUES
(
  'FinTech Neo-Wallet',
  'fintech-neo-wallet',
  'A secure, high-speed multi-currency financial dashboard styled with heavy graphic layouts, featuring real-time transaction tracking and analytics.',
  '# FinTech Neo-Wallet

This is a comprehensive, production-grade financial tracker styled with **Neobrutalism UI**. It facilitates transfers, invoice compilation, currency conversion, and charts representation.

### Features
* **Multi-Currency Wallets**: Manage USD, EUR, IDR, and BTC under separate ledgers.
* **Graphical Charts**: Styled using high-contrast lines and grids powered by `Recharts`.
* **Instant Payments**: Integration with peer transaction handlers.
* **PDF Invoicing**: One-click custom downloads.

### Core Stack
1. **Next.js 14** (App Router & SSR)
2. **Supabase** (Postgres DB, Session tokens, Row Level Security)
3. **Tailwind CSS** (Bold colors and flat cards configuration)
4. **Recharts** (Custom grid-designed analytics)

---
Developed as a sample showcase of premium dashboard aesthetics.',
  ARRAY['Next.js', 'Supabase', 'Tailwind CSS', 'Recharts'],
  true,
  'https://github.com',
  'https://example.com'
),
(
  'Cyber Mart E-Commerce',
  'cyber-mart-e-commerce',
  'Striking storefront with full shopping cart capabilities, user authentication, and stripe checkout integration wrapped in visual grid components.',
  '# Cyber Mart E-Commerce

An intense, highly graphical store interface. It skips typical sterile e-commerce styling in favor of bold neon indicators, high-contrast buttons, and retro layouts.

### Main Mechanics
* **Add to Cart & Checkout**: Interactive storage and validation.
* **Stripe Payment Sheet**: Secure transaction triggers.
* **Admin dashboard**: Easily insert new products, change pricing, and check total earnings.
* **Theme Adaptability**: Dark mode and light mode neobrutalist variants.',
  ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe'],
  true,
  'https://github.com',
  'https://example.com'
),
(
  'Pixel Drawing Board',
  'pixel-drawing-board',
  'Real-time collaborative canvas where users can draw, export, and chat with peers. Built with heavy visual interfaces and Canvas APIs.',
  '# Pixel Drawing Board

Collaborative visual workspace using HTML5 Canvas and socket handshakes.

### Highlights
* **WebSockets Server**: Coordinates paint updates.
* **Neobrutalist tools selection panel**: Styled to look like retro drawing programs (e.g. MS Paint 95).',
  ARRAY['TypeScript', 'Canvas', 'Socket.io', 'CSS Grid'],
  false,
  'https://github.com',
  'https://example.com'
)
ON CONFLICT (slug) DO NOTHING;


INSERT INTO blog_posts (title, slug, summary, content, tags, published, published_at)
VALUES
(
  'Mastering Neobrutalism Design',
  'mastering-neobrutalism-design',
  'A guide to crafting high-impact interfaces using bold borders, vibrant colors, flat shadows, and stark typography.',
  '# Mastering Neobrutalism Design

Neobrutalism is taking the design world by storm. Unlike modern clean-and-sterile minimalism, it features raw layouts, bold black borders, high-saturation colors, and quirky typography.

Here is how you can implement it:
1. **Thick Borders**: Always use `border-4 border-black`.
2. **Flat Shadows**: Instead of soft blurs, use hard offset shadows (`box-shadow: 4px 4px 0px 0px #000`).
3. **Typography**: Large sans-serif headings or monospace fonts work best.

Embrace the bold and construct layouts that command attention!',
  ARRAY['Design', 'CSS', 'UI/UX'],
  true,
  NOW()
)
ON CONFLICT (slug) DO NOTHING;
