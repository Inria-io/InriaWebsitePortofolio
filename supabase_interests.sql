-- SQL Setup for Interests Table
-- Run this in Supabase SQL Editor

-- 1. Create Interests Table
CREATE TABLE IF NOT EXISTS interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'Star',
  color TEXT NOT NULL DEFAULT 'bg-neo-yellow',
  order_index INTEGER DEFAULT 0
);

-- Enable Row Level Security (RLS)
ALTER TABLE interests ENABLE ROW LEVEL SECURITY;

-- Allow public read access
DROP POLICY IF EXISTS "Allow public read access" ON interests;
CREATE POLICY "Allow public read access" ON interests
  FOR SELECT USING (true);

-- Allow admin write access
DROP POLICY IF EXISTS "Allow admin write access" ON interests;
CREATE POLICY "Allow admin write access" ON interests
  FOR ALL TO authenticated USING (true);

-- Grant permissions
GRANT SELECT ON TABLE public.interests TO anon, authenticated;


-- 2. Seed Data (12 interests)
-- Available colors: bg-neo-yellow, bg-neo-blue, bg-neo-pink, bg-neo-green
-- Available icon names (Lucide icon names):
--   Monitor, Database, GitBranch, Lightbulb, Puzzle, Bot,
--   Cloud, Brain, Rocket, Music, Network, Shield, Star,
--   Code, Cpu, Globe, Layers, Zap, Camera, Gamepad2,
--   Palette, Wrench, BookOpen, Heart, etc.
--   (Full list: https://lucide.dev/icons)

INSERT INTO interests (name, icon_name, color, order_index)
VALUES
  ('Technology',            'Monitor',   'bg-neo-yellow', 1),
  ('Data',                  'Database',  'bg-neo-blue',   2),
  ('Agile-Development',     'GitBranch', 'bg-neo-pink',   3),
  ('Creativity',            'Lightbulb', 'bg-neo-green',  4),
  ('Problem Solving',       'Puzzle',    'bg-neo-blue',   5),
  ('Automation',            'Bot',       'bg-neo-yellow', 6),
  ('Cloud Computing',       'Cloud',     'bg-neo-green',  7),
  ('Machine Learning',      'Brain',     'bg-neo-pink',   8),
  ('Innovation',            'Rocket',    'bg-neo-yellow', 9),
  ('Music/Sound Detection', 'Music',     'bg-neo-pink',  10),
  ('Networking',            'Network',   'bg-neo-green', 11),
  ('Security',              'Shield',    'bg-neo-blue',  12)
ON CONFLICT DO NOTHING;
