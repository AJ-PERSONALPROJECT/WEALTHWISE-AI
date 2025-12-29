
export interface HustleIdea {
  id: string;
  title: string;
  category: 'Freelance' | 'Passive' | 'Physical' | 'Investment' | 'Career';
  difficulty: 'Beginner' | 'Intermediate' | 'Expert';
  estMonthlyIncome: string;
  initialInvestment: string;
  description: string;
  actionSteps: string[];
}

export interface UserProfile {
  name: string;
  skills: string[];
  weeklyHours: number;
  availableCapital: number;
  location: string;
  interests: string[];
}

export interface SearchSource {
  title: string;
  uri: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  sources?: SearchSource[];
  timestamp: number;
}
