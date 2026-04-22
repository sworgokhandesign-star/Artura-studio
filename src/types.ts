export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Thumbnails' | 'Ad Creatives' | 'LinkedIn Banners' | 'YouTube Banners' | 'Shorts/Reels Covers';
  imageUrl: string;
}

export interface Metric {
  label: string;
  value: number;
  suffix: string;
}

export interface WorkflowStep {
  id: number;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  type: 'video' | 'screenshot' | 'ctr';
  author: string;
  content: string; // URL or text
}
