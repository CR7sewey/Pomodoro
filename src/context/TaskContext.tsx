import { createContext } from 'react';
import type { TaskStateModel } from '../models/TaskModel';

type TaskContextType = {
  task: TaskStateModel | null;
  setTask: React.Dispatch<React.SetStateAction<TaskStateModel | null>>;
};
const TaskContext = createContext<TaskContextType | null>(null);

export { TaskContext, type TaskContextType };
