import React, { useState } from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Link to='/about-pomodoro'>Understand pomodoro technique</Link>
      <p>Chronos pomodoro - {new Date().getFullYear()}</p>
    </footer>
  );
}
