import React, { useState } from 'react';
import styles from './styles.module.css';
import useTaskContext from '../../context/useTaskContext';
import {
  getSecondsRemainingForCycle,
  getTypeOfCycle,
} from '../../utils/methods';

type TipsProps = {};

export function Tips() {
  const { task } = useTaskContext();

  if (!task.activeTask) {
    return (
      <div className={styles.tips}>
        <span>No active task. Please start a task to see tips.</span>
      </div>
    );
  }

  const messages = {
    workDuration: 'Focus for 25 minutes, then take a 5-minute break.',
    shortBreakDuration:
      'Take a short break! Stretch, walk around, or grab a drink.',
    longBreakDuration:
      'Time for a long break! Relax and recharge for 15 minutes.',
  };

  return (
    <div className={styles.tips}>
      <span>{messages[getTypeOfCycle(task.currentCycle)]}</span>
    </div>
  );
}
