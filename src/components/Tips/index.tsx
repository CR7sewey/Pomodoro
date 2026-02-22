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

  if (task.currentCycle === 0) {
    return (
      <div className={styles.tips}>
        <span>No active task. Please start a task to see tips.</span>
      </div>
    );
  }

  const messagesActiveTask = {
    workDuration: 'Focus for 25 minutes, then take a 5-minute break.',
    shortBreakDuration:
      'Take a short break! Stretch, walk around, or grab a drink.',
    longBreakDuration:
      'Time for a long break! Relax and recharge for 15 minutes.',
  };

  const messagesNoActiveTask = {
    workDuration: `Next cycle will be of ${task.config.workDuration} minutes. Get ready to focus!`,
    shortBreakDuration: `'Next rest will be of ${task.config.shortBreakDuration} minutes. Take a short break! Stretch, walk around, or grab a drink.'`,
    longBreakDuration: `'Next rest will be of ${task.config.longBreakDuration} minutes. Time for a long break! Relax and recharge for 15 minutes.'`,
  };

  return (
    <div className={styles.tips}>
      <span>
        {!!task.activeTask &&
          messagesActiveTask[getTypeOfCycle(task.currentCycle)]}
        {!task.activeTask &&
          messagesNoActiveTask[getTypeOfCycle(task.currentCycle)]}
      </span>
    </div>
  );
}
