type TaskModel = {
  id: string;
  task: string;
  duration: number;
  startDate: number;
  endDate: number | null;
  interruptedDate: number | null;
  type: keyof TaskStateModel['config'];
};

type TaskStateModel = {
  tasks: TaskModel[]; // need it ate: history, MainForm
  secondsRemaining: number; // CountDown, MainForm, Button, History
  formattedSecondsRemaining: string; // Title, CountDown
  activeTask: TaskModel | null; // CountDown, MainForm, Button, History
  currentCycle: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8; // 1-7: ciclos normais, 8: ciclo de descanso longo; Home
  config: {
    // MainForm, Home
    workDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
  };
};

const testTask: TaskModel = {
  id: '1',
  task: 'Estudar React',
  duration: 25 * 60,
  startDate: new Date().getTime(),
  endDate: null,
  interruptedDate: null,
  type: 'workDuration',
};

const initialTaskState: TaskStateModel = {
  tasks: [testTask],
  secondsRemaining: 0,
  formattedSecondsRemaining: '00:00',
  activeTask: testTask,
  currentCycle: 1,
  config: {
    workDuration: 25 * 60, // 25 minutos
    shortBreakDuration: 5 * 60, // 5 minutos
    longBreakDuration: 15 * 60, // 15 minutos
  },
};

const typeConversion = {
  workDuration: 'Work',
  shortBreakDuration: 'Short break',
  longBreakDuration: 'Long break',
};

export {
  type TaskModel,
  type TaskStateModel,
  initialTaskState,
  testTask,
  typeConversion,
};
