
import React, { useState, useEffect } from 'react';
import { profileService } from '../services/ProfileService';
import { UserProfile } from '../types';
import { soundManager } from '../services/SoundManager';

const ProfileSidebar: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(profileService.getProfile());

  useEffect(() => {
    profileService.setTheme(profile.theme);
  }, [profile.theme]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = { ...profile, username: e.target.value };
    setProfile(updated);
    profileService.saveProfile(updated);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = await profileService.uploadAvatar(e.target.files[0]);
      const updated = { ...profile, avatar: base64 };
      setProfile(updated);
      profileService.saveProfile(updated);
      soundManager.play('ping');
    }
  };

  const toggleTheme = () => {
    const newTheme = profile.theme === 'light' ? 'dark' : 'light';
    setProfile({ ...profile, theme: newTheme });
    soundManager.play('whoosh');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3">
        <label className="relative group cursor-pointer">
          <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white overflow-hidden border-4 border-white dark:border-zinc-800 shadow-lg">
            {profile.avatar ? (
              <img src={profile.avatar} className="w-full h-full object-cover" alt="avatar" />
            ) : (
              <span className="text-2xl font-bold">{profile.username.charAt(0)}</span>
            )}
          </div>
          <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <span className="text-[10px] text-white font-bold uppercase">Edit</span>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
        
        <input
          type="text"
          value={profile.username}
          onChange={handleNameChange}
          className="bg-transparent text-center font-bold text-gray-800 dark:text-white border-b border-transparent focus:border-blue-500 outline-none w-full"
          placeholder="Enter name..."
        />
      </div>

      <div className="bg-gray-100 dark:bg-zinc-900 rounded-xl p-3 flex flex-col gap-2">
        <button 
          onClick={toggleTheme}
          className="flex items-center justify-between p-2 hover:bg-white dark:hover:bg-zinc-800 rounded-lg transition-colors text-xs font-medium"
        >
          <span>Appearance</span>
          <span className="bg-blue-500 text-white px-2 py-0.5 rounded uppercase text-[9px]">{profile.theme}</span>
        </button>
        <div className="flex items-center justify-between p-2 text-xs font-medium">
          <span>P2P Status</span>
          <span className="flex items-center gap-1.5 text-green-500">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Online
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
