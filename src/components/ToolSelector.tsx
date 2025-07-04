
import React from 'react';
import { Code, Image, Search, BookOpen, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToolType = 'general' | 'code' | 'image' | 'search' | 'research';

interface Tool {
  id: ToolType;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const tools: Tool[] = [
  {
    id: 'general',
    name: 'General Chat',
    icon: MessageCircle,
    description: 'General conversation and assistance'
  },
  {
    id: 'code',
    name: 'Code AI',
    icon: Code,
    description: 'Programming assistance and code generation'
  },
  {
    id: 'image',
    name: 'Image Generator',
    icon: Image,
    description: 'AI-powered image creation'
  },
  {
    id: 'search',
    name: 'Web Search Tool',
    icon: Search,
    description: 'Search and retrieve web information'
  },
  {
    id: 'research',
    name: 'Deep Research',
    icon: BookOpen,
    description: 'Comprehensive research and analysis'
  }
];

interface ToolSelectorProps {
  activeTool: ToolType;
  onToolChange: (tool: ToolType) => void;
}

const ToolSelector: React.FC<ToolSelectorProps> = ({ activeTool, onToolChange }) => {
  return (
    <div className="bg-white/70 backdrop-blur-md border-b border-white/30 p-4 shadow-sm">
      <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;
          
          return (
            <button
              key={tool.id}
              onClick={() => onToolChange(tool.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-full font-medium transition-all duration-200 hover:scale-105 shadow-sm",
                isActive
                  ? "bg-electric-blue text-white shadow-lg shadow-electric-blue/25"
                  : "bg-white/80 text-graphite hover:bg-white/90 hover:text-graphite-dark"
              )}
              title={tool.description}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{tool.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ToolSelector;
