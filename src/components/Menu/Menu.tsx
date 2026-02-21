import React, { useEffect, useState } from 'react';
import {
  type AvailableThemes,
  getValueFromLocalStorage,
  menuItems,
  setValueToLocalStorage,
} from '../../utils/constants';
import styles from './styles.module.css';
import { MoonIcon, Sun } from 'lucide-react';

type MenuProps = {
  navItems: typeof menuItems;
  setNavItems: React.Dispatch<React.SetStateAction<typeof menuItems>>;
};

export function Menu({ navItems, setNavItems }: MenuProps) {
  const [theme, setTheme] = useState<AvailableThemes>(
    (getValueFromLocalStorage('theme') as AvailableThemes) ?? 'Light',
  );

  const nextTheme = {
    dark: <Sun />,
    light: <MoonIcon />,
  };

  const changeTheme = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setTheme(prevTheme => {
      return prevTheme === 'Light' ? 'Dark' : 'Light';
    });
  };

  const changeActiveItem = (id: number) => {
    const updatedItems = navItems.map(item => ({
      ...item,
      active: item.id === id,
    }));
    setNavItems(updatedItems);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme.toLowerCase());
    setValueToLocalStorage('theme', theme);
  }, [theme]);

  return (
    <nav className={styles.menu}>
      {navItems.slice(0, -1).map(item => (
        <a
          key={item.id}
          href={item.link}
          className={styles.menuLink + (item.active ? ` ${styles.active}` : '')}
          onClick={e => {
            e.preventDefault();
            changeActiveItem(item.id);
          }}
        >
          {item.icon}
        </a>
      ))}
      {navItems.slice(-1).map(item => (
        <a
          key={item.id}
          href={item.link}
          className={styles.menuLink + (item.active ? ` ${styles.active}` : '')}
          onClick={e => {
            e.preventDefault();
            changeTheme(e);
          }}
        >
          {nextTheme[theme.toLowerCase()]}
        </a>
      ))}
    </nav>
  );
}
