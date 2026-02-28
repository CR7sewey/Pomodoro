import { format } from 'date-fns';
import {
  typeConversion,
  type TaskModel,
  type TaskStateModel,
} from '../models/TaskModel';

function getValueFromLocalStorage(key: string, parse: boolean = false) {
  const value = localStorage.getItem(key) ?? null;
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

function sortTasksByField(
  tasks: TaskStateModel['tasks'],
  field: 'task' | 'duration' | 'date' | 'status' | 'type',
  direction: 'asc' | 'desc',
): TaskStateModel['tasks'] {
  return tasks.sort((a, b) => {
    if (field === 'task') {
      if (direction === 'asc') {
        return a.task.localeCompare(b.task); // sort by task name (string)
      }
      return b.task.localeCompare(a.task); // sort by task name (string)
    }
    if (field === 'duration') {
      if (direction === 'asc') {
        return a.duration - b.duration; // sort by duration (number)
      }
      return b.duration - a.duration; // sort by duration (number)
    } else if (field === 'date') {
      if (direction === 'asc') {
        return a.startDate - b.startDate; // sort by start date (number)
      }
      return b.startDate - a.startDate; // sort by start date (number)
    } else if (field === 'status') {
      const statusA = a.endDate
        ? 'Completed'
        : a.interruptedDate
          ? 'Interrupted'
          : 'In Progress';
      const statusB = b.endDate
        ? 'Completed'
        : b.interruptedDate
          ? 'Interrupted'
          : 'In Progress';
      if (direction === 'asc') {
        return statusA.localeCompare(statusB); // sort by status (string)
      }
      return statusB.localeCompare(statusA); // sort by status (string)
    } else if (field === 'type') {
      const typeA = typeConversion[a.type];
      const typeB = typeConversion[b.type];
      if (direction === 'asc') {
        return typeA.localeCompare(typeB); // sort by type (string)
      }
      return typeB.localeCompare(typeA); // sort by type (string)
    } else {
      return 0; // If field is not recognized, do not sort
    }
  });
}

function getFormattedDate(date: number): string {
  const dateF = new Date(date);
  return format(dateF, 'dd/MM/yyyy HH:mm');
}

function getTaskStatus(
  task: TaskModel,
  activeTask: TaskStateModel['activeTask'],
): 'Completed' | 'Interrupted' | 'In Progress' | 'Abandoned' {
  if (task.endDate) {
    return 'Completed';
  }
  if (task.interruptedDate) {
    return 'Interrupted';
  }
  if (task.id === activeTask?.id) {
    return 'In Progress';
  }
  return 'Abandoned';
}

export {
  getValueFromLocalStorage,
  setValueToLocalStorage,
  getNextCycle,
  getSecondsRemainingForCycle,
  getTypeOfCycle,
  formatMinutesToMMSS,
  changeTaskWhenInterrupted,
  sortTasksByField,
  getFormattedDate,
  getTaskStatus,
};
