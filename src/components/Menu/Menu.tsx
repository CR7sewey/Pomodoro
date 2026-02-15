import React from 'react';
import { menuItems } from '../../utils/constants';
import styles from './Menu.module.css';

type MenuProps = {
  navItems: typeof menuItems;
  setNavItems: React.Dispatch<React.SetStateAction<typeof menuItems>>;
};

export function Menu({ navItems, setNavItems }: MenuProps) {
  const changeActiveItem = (id: number) => {
    const updatedItems = navItems.map(item => ({
      ...item,
      active: item.id === id,
    }));
    setNavItems(updatedItems);
  };
  return (
    <nav className={styles.menu}>
      {navItems.map(item => (
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
    </nav>
  );
}
