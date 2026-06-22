export type PetType = 'dog' | 'cat';

export interface InputFieldOption {
  label: string;
  value: string | number;
}

export interface InputField {
  id: string;
  label: string;
  type: 'number' | 'select' | 'slider' | 'checkbox' | 'date';
  defaultValue: any;
  min?: number;
  max?: number;
  step?: number;
  unitType?: 'weight' | 'length' | 'age' | 'liquid' | 'none'; // To handle automatic imperial/metric conversions
  options?: InputFieldOption[];
  tooltip?: string;
}

export interface CalculatorResult {
  label: string;
  value: string | number;
  unit?: string;
  description?: string;
  badge?: 'success' | 'warning' | 'info' | 'danger';
}

export interface ChartDataPoint {
  name: string;
  [key: string]: string | number;
}

export interface CalculatorConfig {
  id: string;
  name: string;
  title: string;
  description: string;
  category: PetType;
  isPopular?: boolean;
  isFeatured?: boolean;
  inputs: InputField[];
  calculate: (inputs: Record<string, any>, unitSystem: 'metric' | 'imperial') => {
    results: CalculatorResult[];
    chartData?: ChartDataPoint[];
    chartConfig?: {
      type: 'bar' | 'line' | 'area' | 'pie';
      dataKeys: string[];
      colors?: string[];
    };
    tips?: string[];
  };
  formula: {
    description: string;
    explanation: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    educationalContent: string; // 500-900 words
    examples: { title: string; steps: string[]; result: string }[];
    faq: { question: string; answer: string }[];
  };
  references: { title: string; url?: string; author?: string }[];
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  publishDate: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;
}

export interface GuideSection {
  title: string;
  content: string;
}

export interface PetGuide {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'dog' | 'cat' | 'general';
  coverImage: string;
  sections: GuideSection[];
}

export interface HistoryItem {
  id: string;
  toolId: string;
  toolName: string;
  category: PetType;
  timestamp: number;
  inputs: Record<string, any>;
  results: CalculatorResult[];
}
