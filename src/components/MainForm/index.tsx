import React, { useState } from 'react';
import styles from './styles.module.css';
import { DefaultInput } from '../DefaultInput';
import { Tips } from '../Tips';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import useTaskContext from '../../context/useTaskContext';

export function MainForm() {
  const [btn, setBtn] = useState(false);
  const { task, setTask } = useTaskContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData);
    console.log('Form values:', formValues);
    setTask((prevTask: any) => {
      console.log('Previous task state:', prevTask);
      return prevTask;
    });
    setBtn(true);
  };

  const handleStopTask = () => {
    setBtn(false);
  };

  // button transition: submit -> submit (start task) -> button (stop task)
  return (
    <form onSubmit={handleSubmit} className='form' action=''>
      <input type='hidden' name='id' value={task.tasks[0]?.id || ''} />
      <div className='formRow'>
        <DefaultInput
          type='text'
          placeholder='Insert a task'
          label='Task'
          id='task'
          name='task'
          defaultValue={task.tasks[0]?.task || ''}
          disabled={btn ? true : false}
        />
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
