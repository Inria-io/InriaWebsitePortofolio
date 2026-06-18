-- SQL Setup for Timeline Records Table
-- Go to your Supabase Dashboard -> SQL Editor -> New Query, paste this script, and run it.

-- 1. Create Timeline Table
CREATE TABLE IF NOT EXISTS timeline_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  type TEXT NOT NULL CHECK (type IN ('work', 'education')),
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT 'bg-neo-yellow',
  order_index INTEGER DEFAULT 0
);

-- Enable Row Level Security (RLS)
ALTER TABLE timeline_records ENABLE ROW LEVEL SECURITY;

-- Allow public read access to timeline
DROP POLICY IF EXISTS "Allow public read access" ON timeline_records;
CREATE POLICY "Allow public read access" ON timeline_records
  FOR SELECT USING (true);

-- Allow authenticated/admin write access
DROP POLICY IF EXISTS "Allow admin write access" ON timeline_records;
CREATE POLICY "Allow admin write access" ON timeline_records
  FOR ALL TO authenticated USING (true);

-- Grant permissions to API roles
GRANT SELECT ON TABLE public.timeline_records TO anon, authenticated;

-- 2. Seed Initial Timeline Data
INSERT INTO timeline_records (type, year, title, company, description, color, order_index)
VALUES
  (
    'work',
    '2024 - Present',
    'Senior Full-Stack Developer',
    'Innovate Tech Labs',
    'Leading frontend initiatives, building Next.js web applications, managing PostgreSQL clusters, and mentoring junior engineers.',
    'bg-neo-yellow',
    1
  ),
  (
    'work',
    '2021 - 2024',
    'Software Engineer',
    'DevFlow Studio',
    'Developed and maintained full-stack websites, integrated third-party payment gateways, and improved database indexing to reduce load times.',
    'bg-neo-blue',
    2
  ),
  (
    'education',
    '2017 - 2021',
    'Computer Science Degree',
    'State University of Technology',
    'Graduated with honors, focusing on software engineering, distributed systems, and user experience paradigms.',
    'bg-neo-green',
    3
  )
ON CONFLICT DO NOTHING;
