import { TimerIcon } from 'lucide-react';
import Heading from './../Heading';
import styles from './styles.module.css';
import { RouterLinkCustom } from '../RouterLinkCustom';

export function Logo() {
  return (
    <Heading className={styles.logo}>
      <RouterLinkCustom href='/' className={styles['logoLink']}>
        <TimerIcon />
        <span>Chronos</span>
      </RouterLinkCustom>
    </Heading>
  );
}
