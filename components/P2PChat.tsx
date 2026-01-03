
import React, { useState, useEffect, useRef } from 'react';
import { soundManager } from '../services/SoundManager';
import { profileService } from '../services/ProfileService';

const P2PChat: React.FC = () => {
  const [peerId, setPeerId] = useState<string>('');
  const [remoteId, setRemoteId] = useState<string>('');
  const [messages, setMessages] = useState<{sender: string, text: string}[]>([]);
  const [input, setInput] = useState('');
  const peerRef = useRef<any>(null);
  const connRef = useRef<any>(null);

  useEffect(() => {
    const profile = profileService.getProfile();
    // In a real app, PeerJS would be loaded as an import or from window.Peer
    const Peer = (window as any).Peer;
    if (Peer) {
      peerRef.current = new Peer();
      peerRef.current.on('open', (id: string) => setPeerId(id));
      peerRef.current.on('connection', (conn: any) => {
        connRef.current = conn;
        setupConnection();
      });
    }
    return () => peerRef.current?.destroy();
  }, []);

  const setupConnection = () => {
    connRef.current.on('data', (data: any) => {
      setMessages(prev => [...prev, data]);
      soundManager.play('ping');
    });
    connRef.current.on('open', () => {
      soundManager.play('tada');
    });
  };

  const connectToPeer = () => {
    if (!remoteId) return;
    connRef.current = peerRef.current.connect(remoteId);
    setupConnection();
    soundManager.play('whoosh');
  };

  const sendMessage = () => {
    if (!input || !connRef.current) return;
    const msg = { sender: profileService.getProfile().username, text: input };
    connRef.current.send(msg);
    setMessages(prev => [...prev, msg]);
    setInput('');
    soundManager.play('click');
  };

  return (
    <div className="flex flex-col h-[500px] bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-2xl overflow-hidden shadow-2xl pop-in">
      <div className="p-4 border-b dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50">
        <div>
          <h3 className="font-bold text-sm">P2P Chat</h3>
          <p className="text-[10px] text-gray-500">ID: <span className="text-blue-500 font-mono select-all">{peerId || 'Initializing...'}</span></p>
        </div>
        {!connRef.current && (
           <div className="flex gap-2">
            <input 
              className="text-xs p-1.5 border dark:border-zinc-700 dark:bg-zinc-800 rounded outline-none" 
              placeholder="Enter Partner ID" 
              value={remoteId}
              onChange={e => setRemoteId(e.target.value)}
            />
            <button onClick={connectToPeer} className="bg-blue-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold">CONNECT</button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
            <span className="text-4xl">💬</span>
            <p className="text-sm mt-2">No messages yet.<br/>Connect with a Peer ID to start chatting.</p>
          </div>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={`flex flex-col ${m.sender === profileService.getProfile().username ? 'items-end' : 'items-start'}`}>
              <span className="text-[9px] font-bold text-gray-400 mb-0.5">{m.sender}</span>
              <div className={`p-2 rounded-2xl text-sm max-w-[80%] ${m.sender === profileService.getProfile().username ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-100 dark:bg-zinc-800 rounded-tl-none'}`}>
                {m.text}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-3 border-t dark:border-zinc-800 flex gap-2">
        <input 
          className="flex-1 bg-gray-50 dark:bg-zinc-800 border dark:border-zinc-700 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
          placeholder="Type message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button 
          onClick={sendMessage}
          disabled={!connRef.current}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-xl transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default P2PChat;
