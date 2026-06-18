-- SQL Setup for Certificates Table
-- Go to your Supabase Dashboard -> SQL Editor -> New Query, paste this script, and run it.

-- 1. Create Certificates Table
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date TEXT NOT NULL,
  image_url TEXT,
  credential_url TEXT,
  color TEXT NOT NULL DEFAULT 'bg-neo-yellow',
  order_index INTEGER DEFAULT 0
);

-- Enable Row Level Security (RLS)
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Allow public read access to certificates
DROP POLICY IF EXISTS "Allow public read access" ON certificates;
CREATE POLICY "Allow public read access" ON certificates
  FOR SELECT USING (true);

-- Allow authenticated/admin write access
DROP POLICY IF EXISTS "Allow admin write access" ON certificates;
CREATE POLICY "Allow admin write access" ON certificates
  FOR ALL TO authenticated USING (true);

-- Grant permissions to API roles
GRANT SELECT ON TABLE public.certificates TO anon, authenticated;

-- 2. Seed Data (3 certificates example)
INSERT INTO certificates (title, issuer, date, image_url, credential_url, color, order_index)
VALUES
  (
    'Data Science Professional Certificate',
    'Digital Skola',
    '2024',
    NULL,
    'https://example.com',
    'bg-neo-yellow',
    1
  ),
  (
    'Automation & QA Engineering',
    'Innovate Tech Labs',
    '2023',
    NULL,
    'https://example.com',
    'bg-neo-blue',
    2
  ),
  (
    'Digital Literacy & Community Empowerment',
    'Social Action Hub',
    '2022',
    NULL,
    'https://example.com',
    'bg-neo-pink',
    3
  )
ON CONFLICT DO NOTHING;
