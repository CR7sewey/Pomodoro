import { useState } from 'react';
import { TaskContext } from './TaskContext';
import { initialTaskState } from './initialTaskState';
import type { TaskStateModel } from '../models/TaskModel';

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [task, setTask] = useState<TaskStateModel | null>(initialTaskState);
  return (
    <TaskContext.Provider value={{ task, setTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider };
