export interface NavItem {
  title: string;
  href: string;
  badge?: string;
  description?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface GameInfo {
  slug: string;
  name: string;
  theme: string;
  reelFormat: string;
  keyFeature: string;
  payoutHighlights: string;
  verificationStatus: string;
  caution: string;
  overview: string;
  history: string;
  symbols: { name: string; type: string; role: string; multiplier?: string }[];
  bonusMechanics: string[];
  rules: string[];
  faq: { q: string; a: string }[];
}

export interface GuideArticle {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: 'core' | 'guides' | 'games' | 'trust';
  summary: string;
  readingTime: string;
  lastVerified: string;
  author: string;
  reviewer: string;
  tableOfContents: { id: string; title: string }[];
  sections: {
    id: string;
    title: string;
    content: string; // Rich markdown or structured paragraphs
    callout?: {
      type: 'info' | 'warning' | 'tip';
      title: string;
      message: string;
    };
    table?: {
      headers: string[];
      rows: string[][];
    };
  }[];
}

export interface TermItem {
  term: string;
  english?: string;
  category: string;
  definition: string;
  example: string;
  seeAlso?: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
  details?: string;
}
