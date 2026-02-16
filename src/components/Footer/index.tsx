import React, { useState } from 'react';
import styles from './styles.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <a href='/'>Understand pomodoro technique</a>
      <p>Chronos pomodoro - {new Date().getFullYear()}</p>
    </footer>
  );
}
