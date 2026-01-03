
import React from 'react';
import { Tool, Category } from '../types';
import { soundManager } from '../services/SoundManager';

interface ToolsListProps {
  onSelectTool: (tool: Tool) => void;
  activeCategory: Category;
}

const TOOLS: Tool[] = [
  { id: 'ttt', name: 'Tic Tac Toe', description: 'Classic 2-player game with sound FX', category: 'Games', icon: '🎮', component: null },
  { id: 'calc', name: 'Smart Calc', description: 'Precision calculator', category: 'Productivity', icon: '🔢', component: null },
  { id: 'notes', name: 'Quick Notes', description: 'Local notepad', category: 'Productivity', icon: '📝', component: null },
  { id: 'conv', name: 'Unit Converter', description: 'Universal conversions', category: 'Utility', icon: '⚖️', component: null },
  { id: 'chat', name: 'P2P Chat', description: 'Real-time peer chat', category: 'Social', icon: '💬', component: null },
];

const ToolsList: React.FC<ToolsListProps> = ({ onSelectTool, activeCategory }) => {
  const filtered = activeCategory === 'All' 
    ? TOOLS 
    : TOOLS.filter(t => t.category === activeCategory);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 fade-in">
      {filtered.map(tool => (
        <button
          key={tool.id}
          onClick={() => {
            soundManager.play('click');
            onSelectTool(tool);
          }}
          className="group relative bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all text-left shadow-sm hover:shadow-xl hover:-translate-y-1"
        >
          <div className="text-3xl mb-3">{tool.icon}</div>
          <h3 className="font-bold text-gray-800 dark:text-white group-hover:text-blue-500 transition-colors">{tool.name}</h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1 line-clamp-2">{tool.description}</p>
          <div className="mt-4 flex items-center text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-600">
            {tool.category}
          </div>
        </button>
      ))}
      
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={`mock-${i}`} className="bg-gray-100/50 dark:bg-zinc-900/30 p-5 rounded-2xl border border-dashed border-gray-200 dark:border-zinc-800 flex flex-col items-center justify-center opacity-50 grayscale">
          <div className="text-3xl mb-3">🛠️</div>
          <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-800 rounded mb-2"></div>
          <div className="h-3 w-32 bg-gray-100 dark:bg-zinc-800 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default ToolsList;
