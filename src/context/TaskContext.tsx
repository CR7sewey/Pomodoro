import { createContext } from 'react';
import type { TaskStateModel } from '../models/TaskModel';
import { initialTaskState } from './initialTaskState';

type TaskContextType = {
  task: TaskStateModel;
  setTask: React.Dispatch<React.SetStateAction<TaskStateModel>>;
};
const TaskContext = createContext<TaskContextType>({
  task: initialTaskState,
  setTask: () => {
    // This is a placeholder function. The actual implementation will be provided by TaskProvider.
  },
}); // context initally null, will be provided by TaskProvider

export { TaskContext, type TaskContextType };
