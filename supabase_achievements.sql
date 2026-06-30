-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date TEXT NOT NULL,
  description TEXT,
  color TEXT, -- background color class (e.g. bg-neo-yellow, bg-neo-blue, bg-neo-pink, bg-neo-green)
  image_url TEXT, -- URL for achievement preview image/credential
  link_url TEXT,
  order_index INT NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access on achievements" 
ON achievements FOR SELECT 
USING (true);

-- Grant permissions to API roles (anon & authenticated)
GRANT SELECT ON TABLE public.achievements TO anon, authenticated;

-- Insert fallback/example data
INSERT INTO achievements (title, issuer, date, description, color, link_url, order_index)
VALUES 
  ('1st Place - Digital Forensics CTF', 'IndoSec & Universitas Negeri', '2024', 'Won first place in the National Capture The Flag (CTF) competition, solving challenges related to memory dump analysis, network logs, and registry analysis.', 'bg-neo-green', '#', 1),
  ('Top 5 Hackathon Winner', 'TechFest Indonesia', '2023', 'Developed an AI-driven disaster response platform in under 48 hours, integrating Mapbox APIs and automated sms alerts.', 'bg-neo-blue', '#', 2);
