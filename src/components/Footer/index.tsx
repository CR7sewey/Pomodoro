import React, { useState } from 'react';
import styles from './styles.module.css';
import { RouterLinkCustom } from '../RouterLinkCustom';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <RouterLinkCustom href='/about-pomodoro'>Understand pomodoro technique</RouterLinkCustom>
      <p>Chronos pomodoro - {new Date().getFullYear()}</p>
    </footer>
  );
}
