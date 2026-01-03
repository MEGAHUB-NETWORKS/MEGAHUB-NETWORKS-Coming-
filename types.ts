// Fix: Added React import to define the React namespace for React.ReactNode
import React from 'react';

export type Category = 'All' | 'Games' | 'Productivity' | 'Tools' | 'Social' | 'Utility';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: Category;
  icon: string;
  component: React.ReactNode;
}

export interface UserProfile {
  username: string;
  avatar: string; // Base64
  theme: 'light' | 'dark';
}

export interface ChatMessage {
  sender: string;
  text: string;
  timestamp: number;
}