
import React, { useEffect, useRef } from 'react';

interface AdContainerProps {
  id: string;
  width: string;
  height: string;
  label: string;
  adKey?: string;
  format?: 'iframe' | 'js';
  className?: string;
}

const AdContainer: React.FC<AdContainerProps> = ({ id, width, height, label, adKey, format = 'iframe', className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adKey && containerRef.current) {
      // Clear previous content
      containerRef.current.innerHTML = '';
      
      const script = document.createElement('script');
      script.type = 'text/javascript';
      
      // Setup the atOptions object required by Adsterra
      const inlineScript = document.createTextNode(`
        atOptions = {
          'key' : '${adKey}',
          'format' : '${format}',
          'height' : ${parseInt(height)},
          'width' : ${parseInt(width)},
          'params' : {}
        };
      `);
      
      script.appendChild(inlineScript);
      containerRef.current.appendChild(script);

      // Invoke the loader script
      const loader = document.createElement('script');
      loader.type = 'text/javascript';
      loader.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
      containerRef.current.appendChild(loader);
    }
  }, [adKey, height, width, format]);

  return (
    <div 
      className={`ad-placeholder overflow-hidden relative ${className}`}
      style={{ width, height, minWidth: width, minHeight: height }}
    >
      <div id={id} ref={containerRef} className="w-full h-full flex items-center justify-center">
        {!adKey && (
          <div className="flex flex-col items-center opacity-30">
            <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-zinc-600 mb-1">Ad Unit</span>
            <span className="text-xs text-gray-400 dark:text-zinc-600">{label}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdContainer;
