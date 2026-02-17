import type { TaskStateModel } from '../models/TaskModel';

export const initialTaskState: TaskStateModel = {
  tasks: [],
  secondsRemaining: 0,
  formattedSecondsRemaining: '00:00',
  activeTask: null,
  currentCycle: 0,
  config: {
    workDuration: 25, // 25 minutos
    shortBreakDuration: 5, // 5 minutos
    longBreakDuration: 15, // 15 minutos
  },
};
