import { TimerIcon } from 'lucide-react';
import Heading from './../Heading';
import styles from './styles.module.css';

export function Logo() {
  return (
    <Heading className={styles.logo}>
      <a href='/' className={styles.logoLink}>
        <TimerIcon />
        <span>Chronos</span>
      </a>
    </Heading>
  );
}
