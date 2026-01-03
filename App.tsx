
import React, { useState } from 'react';
import { CATEGORIES, AD_CONTAINERS } from './constants';
import { Tool, Category } from './types';
import { soundManager } from './services/SoundManager';
import AdContainer from './components/AdContainer';
import ProfileSidebar from './components/ProfileSidebar';
import ToolsList from './components/ToolsList';
import P2PChat from './components/P2PChat';
import TicTacToe from './components/TicTacToe';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [activeTool, setActiveTool] = useState<Tool | null>(null);

  const handleCategoryChange = (cat: Category) => {
    soundManager.play('whoosh');
    setActiveCategory(cat);
    setActiveTool(null);
  };

  const renderTool = () => {
    if (!activeTool) return null;

    switch (activeTool.id) {
      case 'chat':
        return <P2PChat />;
      case 'ttt':
        return <TicTacToe />;
      default:
        return (
          <div className="bg-white dark:bg-zinc-900 p-12 rounded-3xl border border-dashed dark:border-zinc-800 flex flex-col items-center justify-center gap-4 fade-in">
            <span className="text-6xl animate-bounce">🏗️</span>
            <h3 className="text-xl font-bold dark:text-white">{activeTool.name} is Under Construction</h3>
            <p className="text-gray-500 text-center max-w-sm">This module is part of the 50+ tool roadmap. Check back soon or build it yourself using our modular system!</p>
            {/* Contextual Banner for Productivity/Tools */}
            <div className="mt-8">
              <AdContainer id="ad-tool-468" width="468px" height="60px" label="Banner 468x60" adKey="c992751dba51ea4600c3e3b94c90b0af" />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Banner */}
      <div className="w-full flex justify-center py-4 bg-white dark:bg-zinc-950 border-b dark:border-zinc-900 shadow-sm z-10">
        <AdContainer 
          id={AD_CONTAINERS.TOP_728} 
          width="728px" 
          height="90px" 
          label="Top 728x90" 
          adKey="ca62188f74ef0038211200819287107d" 
          className="max-w-[95%] rounded-lg border dark:border-zinc-800" 
        />
      </div>

      <div className="flex-1 flex w-full max-w-[1920px] mx-auto overflow-hidden">
        
        {/* Left Sidebar (Desktop Only) */}
        <aside className="hidden lg:flex flex-col w-[190px] p-4 gap-4 border-r dark:border-zinc-900 sticky top-0 h-[calc(100vh-180px)] overflow-y-auto">
          <AdContainer 
            id={AD_CONTAINERS.LEFT_160} 
            width="160px" 
            height="600px" 
            label="Left 160x600" 
            adKey="3786c373fb067d1092814cd741ef7d0d" 
          />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col bg-gray-50 dark:bg-zinc-950 overflow-y-auto min-h-screen pb-32">
          
          {/* Top Navigation */}
          <nav className="sticky top-0 z-20 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b dark:border-zinc-900 px-6 py-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTool(null)}>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">M</div>
              <h1 className="text-lg font-black tracking-tight dark:text-white">MEGA<span className="text-blue-600">HUB</span></h1>
            </div>
            
            <div className="hidden md:flex items-center gap-1 bg-gray-100 dark:bg-zinc-900 p-1 rounded-xl">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeCategory === cat 
                    ? 'bg-white dark:bg-zinc-800 text-blue-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
               <a 
                 href="https://www.effectivegatecpm.com/u4x97iz6?key=6a5487414458b848a32026ced886c85d" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 text-[10px] font-black uppercase tracking-wider rounded-lg border border-blue-200 dark:border-blue-800/50 hover:bg-blue-100 transition-colors"
               >
                 Premium
               </a>
               <button className="md:hidden p-2 bg-gray-100 dark:bg-zinc-900 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
               </button>
            </div>
          </nav>

          {/* Central Workspace */}
          <div className="flex-1 p-6">
            {activeTool ? (
              <div className="max-w-4xl mx-auto">
                <div className="mb-6 flex items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-2xl border dark:border-zinc-800 shadow-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{activeTool.icon}</span>
                    <div>
                      <h2 className="text-xl font-bold dark:text-white">{activeTool.name}</h2>
                      <p className="text-xs text-gray-500 dark:text-zinc-400">{activeTool.description}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      soundManager.play('whoosh');
                      setActiveTool(null);
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
                
                {renderTool()}
              </div>
            ) : (
              <ToolsList onSelectTool={setActiveTool} activeCategory={activeCategory} />
            )}
          </div>
        </main>

        {/* Right Sidebar (Desktop Only) */}
        <aside className="hidden xl:flex flex-col w-[340px] p-6 gap-6 border-l dark:border-zinc-900 sticky top-0 h-[calc(100vh-180px)] overflow-y-auto bg-white/50 dark:bg-zinc-950/50">
          <ProfileSidebar />
          <div className="border-t dark:border-zinc-900 pt-6">
            <AdContainer 
              id={AD_CONTAINERS.RIGHT_300} 
              width="160px" 
              height="300px" 
              label="Right 160x300" 
              adKey="6d30c2159793f3f5d0a2f28567d808d4" 
              className="mx-auto rounded-xl border dark:border-zinc-800"
            />
          </div>
          <div className="mt-auto pt-4 flex flex-col gap-3">
             <div className="text-[10px] font-bold text-gray-400 dark:text-zinc-600 uppercase tracking-widest">Recommended</div>
             
             {/* Adsterra Native Banner Container */}
             <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border dark:border-zinc-800 overflow-hidden min-h-[150px]">
                <div id="container-f61a4274586f36ba796ad9362c93a165"></div>
                <script async="async" data-cfasync="false" src="https://pl28380256.effectivegatecpm.com/f61a4274586f36ba796ad9362c93a165/invoke.js"></script>
             </div>
          </div>
        </aside>

      </div>

      {/* Sticky Bottom Footer Ad */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-zinc-950/95 border-t dark:border-zinc-900 py-2 flex justify-center backdrop-blur-sm shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <AdContainer 
          id={AD_CONTAINERS.BOTTOM_320} 
          width="320px" 
          height="50px" 
          label="Footer 320x50" 
          adKey="8b1e3d61861d1c17368c4fd4e1eecf52" 
        />
      </footer>
    </div>
  );
};

export default App;
