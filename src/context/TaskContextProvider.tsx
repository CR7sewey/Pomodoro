import { useEffect, useReducer, useState } from 'react';
import { TaskContext } from './TaskContext';
import { initialTaskState } from './initialTaskState';
import type { TaskStateModel } from '../models/TaskModel';
import {
  getValueFromLocalStorage,
  setValueToLocalStorage,
} from '../utils/methods';
import { taskReducer } from './taskReducer';

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

  useEffect(() => {
    const parsedTask = JSON.stringify(task);
    setValueToLocalStorage('task', parsedTask, true);
  }, [task]);

  return (
    <TaskContext.Provider value={{ task, dispatch }}>
      {/* TaskContext.Provider provides the task state and dispatch to its children */}
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider };
