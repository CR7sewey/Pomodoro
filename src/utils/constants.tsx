import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';

const menuItems = [
  { id: 0, link: '/', active: true, icon: <HouseIcon /> },
  { id: 1, link: '/history', active: false, icon: <HistoryIcon /> },
  { id: 2, link: '/configurations', active: false, icon: <SettingsIcon /> },
  { id: 3, link: '/', active: false, icon: <SunIcon /> },
];

type AvailableThemes = 'Light' | 'Dark';

function getThemeFromLocalStorage(): AvailableThemes {
  return (localStorage.getItem('theme') as AvailableThemes) ?? 'Light';
}

function setThemeFromLocalStorage(theme: AvailableThemes): void {
  localStorage.setItem('theme', theme);
}

export {
  menuItems,
  AvailableThemes,
  getThemeFromLocalStorage,
  setThemeFromLocalStorage,
};
