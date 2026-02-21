import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import { DefaultInput } from '../DefaultInput';
import { Tips } from '../Tips';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import useTaskContext from '../../context/useTaskContext';
import type { TaskModel, TaskStateModel } from '../../models/TaskModel';
import {
  formatMinutesToMMSS,
  getNextCycle,
  getTypeOfCycle,
} from '../../utils/methods';

export function MainForm() {
  const [btn, setBtn] = useState(false);
  const { task, setTask } = useTaskContext();
  const taskSubmitted = useRef<HTMLInputElement>(null); // prevents unnecessary re-renders when typing in the input field, as the value is stored in a ref instead of state

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', taskSubmitted.current?.value);
    // const formData = new FormData(e.currentTarget);
    // const formValues = Object.fromEntries(formData);
    const taskName = taskSubmitted.current?.value.trim();
    if (taskName === '') {
      alert('Please enter a task name.');
      return;
    }

    const nextCycle = getNextCycle(task.currentCycle);
    const type = getTypeOfCycle(nextCycle);

    const newTask: TaskModel = {
      id: Date.now().toString(),
      task: taskName ?? 'Unnamed Task',
      startDate: Date.now(),
      endDate: null,
      interruptedDate: null,
      duration: task.config[type], // duration in minutes based on the cycle type
      type: type,
    };

    //const secondsRemaining = newTask.duration * 60; // Convert duration from minutes to seconds

    setTask((prevTask: TaskStateModel) => {
      return {
        ...prevTask,
        currentCycle: nextCycle,
        secondsRemaining: newTask.duration * 60, // to be implemented
        formattedSecondsRemaining: formatMinutesToMMSS(newTask.duration), // formatted duration
        tasks: [...prevTask.tasks, newTask],
        activeTask: newTask,
      };
    });
    setBtn(true);
  };

  /*document.addEventListener('submit', (e: any) => {
    e.preventDefault();
    console.log('Form submitted:', e.target);
  });*/

  const handleStopTask = () => {
    setBtn(false);
  };
  console.log('Rendered');
  // button transition: submit -> submit (start task) -> button (stop task)
  return (
    <form onSubmit={handleSubmit} className='form' action=''>
      <input type='hidden' name='id' value={task.activeTask?.id || ''} />
      <div className='formRow'>
        <DefaultInput
          type='text'
          placeholder='Insert a task'
          label='Task'
          id='taskName'
          name='taskName'
          ref={taskSubmitted}
          defaultValue={task.activeTask?.task || ''}
          disabled={btn ? true : false}
        />
        {/* value = {task} onChange = {(e) => setTask(e.target.value)} */}
      </div>
      <div className='formRow'>
        <Tips />
      </div>
      <div className='formRow'>
        <Cycles />
      </div>
      <div className='formRow'>
        <DefaultButton
          type={btn === true ? 'button' : 'submit'}
          btn={btn}
          setBtn={setBtn}
          color={btn === true ? 'red' : 'green'}
          key={btn === true ? 'botao_button' : 'botao_submit'}
          aria-label={btn === true ? 'Stop task' : 'Start task'}
          onClick={btn ? handleStopTask : undefined}
        />
      </div>
    </form>
  );
}
