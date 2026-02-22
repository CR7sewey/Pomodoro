import type { TaskModel, TaskStateModel } from '../models/TaskModel';
import {
  changeTaskWhenInterrupted,
  formatMinutesToMMSS,
  getNextCycle,
} from '../utils/methods';
import { initialTaskState } from './initialTaskState';

export type TaskAction =
  | { type: 'ADD_TASK'; payload: TaskModel }
  | { type: 'INTERRUPT_TASK' }
  | { type: 'COUNT_DOWN'; payload: { secondsRemaining: number } }
  | { type: 'RESET_STATE' }
  | { type: 'COMPLETE_TASK' }
  | { type: 'CHANGE_SETTINGS'; payload: TaskStateModel['config'] };

export const taskReducer = (
  state: TaskStateModel,
  action: TaskAction,
): TaskStateModel => {
  switch (action.type) {
    case 'ADD_TASK':
      if (state.secondsRemaining > 0 && state.currentCycle > 0) {
        return { ...state, activeTask: state.tasks[state.tasks.length - 1] }; // Do not add a new task if there's an active one
      }
      return {
        ...state,
        currentCycle: getNextCycle(state.currentCycle),
        secondsRemaining: action.payload.duration * 60,
        formattedSecondsRemaining: formatMinutesToMMSS(action.payload.duration),
        tasks: [...state.tasks, action.payload],
        activeTask: action.payload,
      };
    case 'INTERRUPT_TASK':
      return {
        ...changeTaskWhenInterrupted(state),
        activeTask: null,
      };
    case 'RESET_STATE':
      return {
        ...initialTaskState,
      };
    default:
      return state;
  }
};
