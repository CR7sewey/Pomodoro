import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';
import type { TaskStateModel } from '../models/TaskModel';

const menuItems = [
  { id: 0, link: '/', active: true, icon: <HouseIcon /> },
  { id: 1, link: '/history', active: false, icon: <HistoryIcon /> },
  { id: 2, link: '/configurations', active: false, icon: <SettingsIcon /> },
  { id: 3, link: '/', active: false, icon: <SunIcon /> },
];

type AvailableThemes = 'Light' | 'Dark';

export { menuItems, AvailableThemes };
