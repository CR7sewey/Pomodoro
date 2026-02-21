import React, { useState } from 'react';
import styles from './styles.module.css';
import useTaskContext from '../../context/useTaskContext';

export function CountDown() {
  const { task } = useTaskContext();
  return (
    <div className={styles.countdown}>{task.formattedSecondsRemaining}</div>
  );
}
