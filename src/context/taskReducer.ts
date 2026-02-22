import type { TaskModel, TaskStateModel } from '../models/TaskModel';
import {
  changeTaskWhenInterrupted,
  formatMinutesToMMSS,
  getNextCycle,
} from '../utils/methods';
import { initialTaskState } from './initialTaskState';

export enum TaskActionTypes {
  ADD_TASK = 'ADD_TASK',
  INTERRUPT_TASK = 'INTERRUPT_TASK',
  COUNT_DOWN = 'COUNT_DOWN',
  RESET_STATE = 'RESET_STATE',
  COMPLETE_TASK = 'COMPLETE_TASK',
  CHANGE_SETTINGS = 'CHANGE_SETTINGS',
}

export type TaskAction =
  | { type: TaskActionTypes.ADD_TASK; payload: TaskModel }
  | { type: TaskActionTypes.INTERRUPT_TASK }
  | { type: TaskActionTypes.COUNT_DOWN; payload: { secondsRemaining: number } }
  | { type: TaskActionTypes.RESET_STATE }
  | { type: TaskActionTypes.COMPLETE_TASK }
  | {
      type: TaskActionTypes.CHANGE_SETTINGS;
      payload: TaskStateModel['config'];
    };

export const taskReducer = (
  state: TaskStateModel,
  action: TaskAction,
): TaskStateModel => {
  switch (action.type) {
    case TaskActionTypes.ADD_TASK:
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
    case TaskActionTypes.INTERRUPT_TASK:
      return {
        ...changeTaskWhenInterrupted(state),
        activeTask: null,
      };
    case TaskActionTypes.RESET_STATE:
      return {
        ...initialTaskState,
      };
    default:
      return state;
  }
};
