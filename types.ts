
import type { ReactNode } from 'react';

export interface MindMapNode {
  name: string;
  children?: MindMapNode[];
}

export interface ArchitectureNode {
  title: string;
  description: string;
}

export interface DetailSection {
  title: string;
  content: string[];
  code?: {
    language: string;
    snippet: string;
    title?: string;
  }[];
}

export interface TopicContent {
  definition: string;
  purpose: string;
  architecture: ArchitectureNode[];
  keyPoints: string[];
  mindMap: MindMapNode;
  details?: DetailSection[];
}

export interface Topic {
  id: string;
  title: string;
  icon: ReactNode;
  content: TopicContent;
}