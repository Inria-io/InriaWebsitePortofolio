export interface Project {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  description: string;
  content: string; // Markdown text
  image_url?: string;
  github_url?: string;
  live_url?: string;
  tags: string[];
  featured: boolean;
}

export interface BlogPost {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  summary: string;
  content: string; // Markdown text
  cover_image?: string;
  tags: string[];
  published: boolean;
  published_at: string;
}

export interface ContactMessage {
  id: string;
  created_at: string;
  name: string;
  email: string;
  message: string;
}

export interface Testimonial {
  id: string;
  created_at: string;
  name: string;
  role: string;
  quote: string;
  avatar_url?: string;
  order_index: number;
}

export interface Interest {
  id: string;
  created_at: string;
  name: string;
  icon_name: string;
  color: string;
  order_index: number;
}

export interface Skill {
  id: string;
  created_at: string;
  name: string;
  category: string;
  level: string;
  percentage: number;
  order_index: number;
}

export interface SoftSkill {
  id: string;
  created_at: string;
  title: string;
  description: string;
  order_index: number;
}

export interface Certificate {
  id: string;
  created_at: string;
  title: string;
  issuer: string;
  date: string;
  image_url?: string;
  credential_url?: string;
  color: string;
  order_index: number;
}

export interface TimelineRecord {
  id: string;
  created_at?: string;
  type: "work" | "education";
  year: string;
  title: string;
  company: string;
  description: string;
  color: string;
  order_index?: number;
}

