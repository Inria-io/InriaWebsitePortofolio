-- SQL Setup for Testimonials Table
-- Run this in Supabase SQL Editor

-- 1. Create Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  quote TEXT NOT NULL,
  avatar_url TEXT,
  order_index INTEGER DEFAULT 0
);

-- Enable Row Level Security (RLS)
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Allow public read access
DROP POLICY IF EXISTS "Allow public read access" ON testimonials;
CREATE POLICY "Allow public read access" ON testimonials
  FOR SELECT USING (true);

-- Allow admin write access
DROP POLICY IF EXISTS "Allow admin write access" ON testimonials;
CREATE POLICY "Allow admin write access" ON testimonials
  FOR ALL TO authenticated USING (true);

-- Grant permissions
GRANT SELECT ON TABLE public.testimonials TO anon, authenticated;


-- 2. Create Storage Bucket for Avatars
-- NOTE: Storage buckets must be created via Supabase Dashboard:
--   1. Go to Storage in sidebar
--   2. Click "New Bucket"
--   3. Name it "avatars"
--   4. Check "Public bucket" (so images are publicly accessible)
--   5. Click "Create bucket"
--   6. Go to bucket Policies, add a policy:
--      - "Allow public read" for SELECT (anon)
--      - "Allow authenticated upload" for INSERT (authenticated)


-- 3. Seed Data (3 example testimonials)
INSERT INTO testimonials (name, role, quote, order_index)
VALUES
(
  'Aditya Soleh',
  'CEO & Founder Digital Skola',
  'Saya sudah berkolaborasi bersama selama kurang lebih 2 tahun, dimana dirinya berperan sebagai salah 1 tutor Data Science di Digital Skola. Sebagai seorang tutor, peran utamanya adalah mengajarkan materi-materi terkait Data Science kepada para "Techies". Dalam menjalankan perannya ini, tidak sedikit Techies yang menyukai passion nya dalam mengajar.',
  1
),
(
  'Winson Sasongko Purnomo',
  'Digital Marketing Manager Cocotel International',
  'A perfect example of a skilled Automation Engineer in any IT related fields. Brings all the abilities to the table. Focused, reliable, and goal-oriented, and an outstanding person. Any organization/company would be lucky to have them as their most valuable asset.',
  2
),
(
  'Imam Suprapto',
  'Owner Djoyoline Group',
  'Saya dengan senang hati merekomendasikan untuk dedikasi luar biasanya di perusahaan kami. Berperan penting dalam menghasilkan beberapa aplikasi inovatif yang telah sangat meningkatkan produktivitas dan efisiensi kami. Perhatian terhadap detail dan dedikasi terhadap pekerjaannya benar-benar mengesankan.',
  3
)
ON CONFLICT DO NOTHING;
