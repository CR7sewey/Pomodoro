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
  { id: 3, link: '/theme', active: false, icon: <MoonIcon /> },
];

export { menuItems };
