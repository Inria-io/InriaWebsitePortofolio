-- Create technical skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  level TEXT NOT NULL,
  percentage INTEGER NOT NULL,
  order_index INTEGER DEFAULT 0
);

-- Create soft skills table
CREATE TABLE IF NOT EXISTS soft_skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  order_index INTEGER DEFAULT 0
);

-- Enable RLS for skills
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Enable RLS for soft_skills
ALTER TABLE soft_skills ENABLE ROW LEVEL SECURITY;

-- Create policies for public read-only access
CREATE POLICY "Allow public read access on skills" 
  ON skills FOR SELECT 
  TO public 
  USING (true);

CREATE POLICY "Allow public read access on soft_skills" 
  ON soft_skills FOR SELECT 
  TO public 
  USING (true);

-- Grant select permissions to API roles (anon & authenticated)
GRANT SELECT ON TABLE public.skills TO anon, authenticated;
GRANT SELECT ON TABLE public.soft_skills TO anon, authenticated;

-- Clear existing data if any (for idempotency)
TRUNCATE TABLE skills;
TRUNCATE TABLE soft_skills;

-- Seed initial technical skills
INSERT INTO skills (name, category, level, percentage, order_index) VALUES
-- Frontend Engineering
('Next.js 14+', 'Frontend Engineering', 'Expert', 95, 1),
('React / React Native', 'Frontend Engineering', 'Expert', 95, 2),
('TypeScript', 'Frontend Engineering', 'Advanced', 88, 3),
('Tailwind CSS', 'Frontend Engineering', 'Expert', 98, 4),
('Framer Motion', 'Frontend Engineering', 'Advanced', 85, 5),
('Redux / Zustand', 'Frontend Engineering', 'Advanced', 85, 6),
('HTML5 & CSS3', 'Frontend Engineering', 'Expert', 99, 7),

-- Backend & Systems
('Node.js (Express/Nest)', 'Backend & Systems', 'Advanced', 85, 8),
('Supabase & Postgres', 'Backend & Systems', 'Advanced', 90, 9),
('REST & GraphQL APIs', 'Backend & Systems', 'Expert', 92, 10),
('MongoDB & Prisma', 'Backend & Systems', 'Advanced', 80, 11),
('Serverless (AWS/Vercel)', 'Backend & Systems', 'Advanced', 82, 12),
('Docker Containers', 'Backend & Systems', 'Intermediate', 70, 13),

-- Tools & Professional workflows
('Git & Collaborative GitHub', 'Tools & Professional workflows', 'Expert', 95, 14),
('Figma UI/UX Prototyping', 'Tools & Professional workflows', 'Advanced', 80, 15),
('Jest / Cypress Testing', 'Tools & Professional workflows', 'Intermediate', 75, 16),
('CI/CD (Github Actions)', 'Tools & Professional workflows', 'Advanced', 85, 17),
('Vercel / AWS Amplify', 'Tools & Professional workflows', 'Expert', 90, 18),
('Agile / Scrum Methodologies', 'Tools & Professional workflows', 'Advanced', 85, 19);

-- Seed initial soft skills
INSERT INTO soft_skills (title, description, order_index) VALUES
('Technical Communication', 'Write clear docs, present to stakeholders, explain tradeoffs simply', 1),
('Problem Solving', 'Debug complex systems, break problems into solvable parts', 2),
('Cross-Team Collaboration', 'Work effectively with design, product, and ops teams', 3),
('Time Management', 'Deliver features on schedule, balance multiple workstreams', 4),
('Mentorship', 'Onboard junior devs, conduct code reviews, share knowledge', 5),
('Adaptability', 'Learn new stacks quickly, thrive in ambiguous situations', 6);
