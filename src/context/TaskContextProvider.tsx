import { useEffect, useState } from 'react';
import { TaskContext } from './TaskContext';
import { initialTaskState } from './initialTaskState';
import type { TaskStateModel } from '../models/TaskModel';
import {
  getValueFromLocalStorage,
  setValueToLocalStorage,
} from '../utils/methods';

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [task, setTask] = useState<TaskStateModel>(
    JSON.parse(getValueFromLocalStorage('task', true) ?? 'null') ??
      initialTaskState,
  );

  useEffect(() => {
    const parsedTask = JSON.stringify(task);
    setValueToLocalStorage('task', parsedTask, true);
  }, [task]);

  return (
    <TaskContext.Provider value={{ task, setTask }}>
      {/* TaskContext.Provider provides the task state and setter to its children */}
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider };
