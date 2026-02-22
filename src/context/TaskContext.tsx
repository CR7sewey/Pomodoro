import { createContext } from 'react';
import type { TaskStateModel } from '../models/TaskModel';
import { initialTaskState } from './initialTaskState';
import type { TaskAction } from './taskReducer';

type TaskContextType = {
  task: TaskStateModel;
  dispatch: React.ActionDispatch<[action: TaskAction]>;
};
const TaskContext = createContext<TaskContextType>({
  task: initialTaskState,
  dispatch: () => {},
}); // context initally null, will be provided by TaskProvider

export { TaskContext, type TaskContextType };
