
import { UserProfile } from '../types';

const STORAGE_KEY = 'megahub_profile';

export const profileService = {
  getProfile(): UserProfile {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { username: 'Guest User', avatar: '', theme: 'dark' };
  },

  saveProfile(profile: UserProfile): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  },

  setTheme(theme: 'light' | 'dark'): void {
    const profile = this.getProfile();
    this.saveProfile({ ...profile, theme });
    document.documentElement.classList.toggle('dark', theme === 'dark');
  },

  uploadAvatar(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
};
