import type { TaskStateModel } from '../models/TaskModel';

function getValueFromLocalStorage(key: string, parse: boolean = false) {
  const value = localStorage.getItem(key);
  return value;
}

function setValueToLocalStorage(
  key: string,
  value: string,
  parse: boolean = false,
): void {
  localStorage.setItem(key, value);
}

function getNextCycle(
  currentCycle: TaskStateModel['currentCycle'],
): TaskStateModel['currentCycle'] {
  if (currentCycle >= 1 && currentCycle <= 7) {
    return (currentCycle + 1) as TaskStateModel['currentCycle'];
  } else {
    return 1; // Reset to cycle 1 after cycle 7
  }
}

function getSecondsRemainingForCycle(
  cycle: TaskStateModel['currentCycle'],
  config: TaskStateModel['config'],
): number {
  switch (cycle) {
    case 1:
    case 3:
    case 5:
    case 7:
      return config.workDuration;
    case 2:
    case 4:
    case 6:
      return config.shortBreakDuration;
    case 8:
      return config.longBreakDuration;
    default:
      return config.workDuration; // Default to work duration if cycle is out of range
  }
}

function getTypeOfCycle(
  cycle: TaskStateModel['currentCycle'],
): keyof TaskStateModel['config'] {
  if (cycle % 8 === 0) return 'longBreakDuration';
  if (cycle % 2 === 0) return 'shortBreakDuration';
  return 'workDuration'; // Default to work duration if cycle is out of range
}

function formatMinutesToMMSS(minutes: number): string {
  const mins = Math.floor(minutes);
  const seconds = Math.floor((minutes - mins) * 60);
  return `${String(mins).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function formatSecondsToMinutes(seconds: number) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secondsMod = String(Math.floor(seconds % 60)).padStart(2, '0');
  return `${minutes}:${secondsMod}`;
}

function changeTaskWhenInterrupted(task: TaskStateModel) {
  task.tasks = task.tasks.map(t => {
    console.log('Checking task:', t);
    console.log('Active task:', task.activeTask);
    if (t.id === task.activeTask?.id) {
      console.log('Stopping task:', t);
      // Logic
      // if it is the first time being interrupted, we use startDate and interruptedDate;
      const interruptedDate = Date.now();
      console.log(
        'Seconds remaining after interruption:',
        task.secondsRemaining,
      );
      task.formattedSecondsRemaining = formatSecondsToMinutes(
        task.secondsRemaining,
      );
      return {
        ...t,
        interruptedDate,
      };
    }
    return t;
  });
  return task;
}

export {
  getValueFromLocalStorage,
  setValueToLocalStorage,
  getNextCycle,
  getSecondsRemainingForCycle,
  getTypeOfCycle,
  formatMinutesToMMSS,
  changeTaskWhenInterrupted,
};
