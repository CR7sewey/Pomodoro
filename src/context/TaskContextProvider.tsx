import { useEffect, useReducer, useState } from 'react';
import { TaskContext } from './TaskContext';
import { initialTaskState } from './initialTaskState';
import {
  getValueFromLocalStorage,
  setValueToLocalStorage,
} from '../utils/methods';
import { TaskActionTypes, taskReducer } from './taskReducer';
import { TimerWorkerManager } from '../workers/TimeWorkerManager';
import type { TaskStateModel } from '../models/TaskModel';

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [task, dispatch] = useReducer(
    taskReducer,
    initialTaskState,
    () => {
      if (!getValueFromLocalStorage('task', true)) {
        return initialTaskState; // Return initial state if task exists in localStorage to avoid parsing issues
      }
      const parsed = JSON.parse(getValueFromLocalStorage('task', true) as string) as TaskStateModel;
      return { ...parsed, activeTask: null, secondsRemaining: 0 }; // Ensure activeTask is false on load to prevent unintended timer starts
    }
  );

  const [btn, setBtn] = useState(false);

  /*useState<TaskStateModel>(
    JSON.parse(getValueFromLocalStorage('task', true) ?? 'null') ??
      initialTaskState,
  );*/

  /*const worker = new Worker(
    new URL('../workers/timerWorker.js', import.meta.url),
  );*/
  const worker = TimerWorkerManager.getInstance();

  // receive messages from the worker and update the task state accordingly
  worker.onmessage(e => {
    console.log('Message received from worker:', e.data);
    const countdown = e.data;
    if (countdown <= 0) {
      worker.terminate();
      dispatch({
        type: TaskActionTypes.COMPLETE_TASK,
      });
      return;
    }

    dispatch({
      type: TaskActionTypes.COUNT_DOWN,
      payload: { secondsRemaining: countdown },
    });
  });

  //worker.dispatchEvent(new MessageEvent('message', { data: task }));

  useEffect(() => {
    const parsedTask = JSON.stringify(task);
    setValueToLocalStorage('task', parsedTask, true);
    if (!task.activeTask) {
      worker.terminate();
    }
    worker.postMessage(task);
    console.log('Task state updated and sent to worker:', task);
    document.title = `${task.formattedSecondsRemaining} - Chronos Pomodoro`;
  }, [worker, task]);

  return (
    <TaskContext.Provider value={{ task, dispatch, btn, setBtn }}>
      {/* TaskContext.Provider provides the task state and dispatch to its children */}
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider };
