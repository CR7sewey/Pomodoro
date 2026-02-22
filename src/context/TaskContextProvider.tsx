import { useEffect, useReducer, useRef, useState } from 'react';
import { TaskContext } from './TaskContext';
import { initialTaskState } from './initialTaskState';
import type { TaskStateModel } from '../models/TaskModel';
import {
  getValueFromLocalStorage,
  setValueToLocalStorage,
} from '../utils/methods';
import { TaskActionTypes, taskReducer } from './taskReducer';
import { TimerWorkerManager } from '../workers/TimerWorkerManager';

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [task, dispatch] = useReducer(
    taskReducer,
    JSON.parse(getValueFromLocalStorage('task', true) ?? 'null') ??
      initialTaskState,
  );
  /*useState<TaskStateModel>(
    JSON.parse(getValueFromLocalStorage('task', true) ?? 'null') ??
      initialTaskState,
  );*/

  const worker = new Worker(
    new URL('../workers/timerWorker.js', import.meta.url),
  );

  worker.onmessage = function (e) {
    console.log('Message received from worker:', e.data);
  };

  useEffect(() => {
    const parsedTask = JSON.stringify(task);
    setValueToLocalStorage('task', parsedTask, true);
    if (task.activeTask) {
      worker.postMessage(task);
    } else {
      worker.terminate();
    }

    document.title = `${task.formattedSecondsRemaining} - Chronos Pomodoro`;
  }, [worker, task]);

  return (
    <TaskContext.Provider value={{ task, dispatch }}>
      {/* TaskContext.Provider provides the task state and dispatch to its children */}
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider };
