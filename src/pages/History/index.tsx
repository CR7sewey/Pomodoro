import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import { MainTemplate } from '../../templates/MainTemplate'
import Heading from '../../components/Heading'
import styles from './styles.module.css'
import { TrashIcon } from 'lucide-react'
import { DefaultButton } from '../../components/DefaultButton'
import useTaskContext from '../../context/useTaskContext'
import { typeConversion, type TaskStateModel } from '../../models/TaskModel'
import { formatSecondsToMinutes, getFormattedDate, getTaskStatus, sortTasksByField } from '../../utils/methods'
import { TaskActionTypes } from '../../context/taskReducer'
import { toast } from 'react-toastify'
import { showMessage } from '../../adapter/showMessage'

export const History = () => {
  const { task, dispatch, setBtn } = useTaskContext();
  const [historyCleared, setHistoryCleared] = useState(false); // state to track if history has been cleared
  const [historyTasks, setHistoryTasks] = useState(() => {
    return {
      tasks: [...task.tasks],
      field: 'date',
      direction: 'asc',
    }
  });

  useEffect(() => {
    setHistoryTasks(prev => ({ ...prev, tasks: [...task.tasks] }));
  }, [task.tasks, historyCleared]); // re-run effect when task.tasks or historyCleared changes to update the displayed tasks after clearing history
  // Omit<typeof historyTasks, 'tasks' | 'direction'> - We only need the tasks array and sorting info for this component, so we can omit the other properties from the state model
  const orderByParameter = ({ field }: Pick<typeof historyTasks, 'field'>) => {
    setHistoryTasks(prev => ({ ...prev, field, direction: prev.direction === 'asc' ? 'desc' : 'asc' }));

    const sortedTasks = sortTasksByField(
      [...historyTasks.tasks],
      field as 'task' | 'duration' | 'date' | 'status' | 'type',
      historyTasks.direction === 'asc' ? 'desc' : 'asc',
    );
    setHistoryTasks((prev) => {
      return {
        ...prev,
        tasks: sortedTasks,
      }
    });
  };

  function clearHistory() {
    showMessage.dismiss(); // dismiss any existing toasts before showing a new one
    // disable btn
    const btn = document.getElementById('clear-history');
    if (btn) {
      btn.setAttribute('disabled', 'true');
      btn.blur(); // remove focus from the button after clicking to prevent accidental multiple clicks
    }
    /*toast("Hello world!", {
      onClose: (reason) => {
        console.log('Toast closed - ' + reason);
      }
    });*/
    showMessage.confirm('History cleared', (confirmation: boolean) => {
      if (!confirmation) {
        if (btn) {
          btn.removeAttribute('disabled');
        }
        return;
      }
      dispatch({ type: TaskActionTypes.RESET_STATE });
      setHistoryCleared(prev => !prev); // toggle state to trigger re-render and update displayed tasks
      setBtn(false);
    });
    /*if (window.confirm('Are you sure you want to clear the history? This action cannot be undone.')) {
      dispatch({ type: TaskActionTypes.RESET_STATE });
      setBtn(false);
    }*/

  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span style={{ fontSize: '3.4rem', fontWeight: 'bold' }}>History</span>
          <span className={styles.buttonContainer}>
            {task.tasks.length > 0 && (
              <DefaultButton
                id='clear-history'
                icon={<TrashIcon />}
                color='red'
                aria-label='Apagar todo o histórico'
                title='Apagar histórico'
                onClick={clearHistory}
              />
            )}
          </span>
        </Heading>
      </Container>
      <Container>
        {historyTasks.tasks.length !== 0 ?
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th onClick={() => orderByParameter({ field: 'task' })} className={styles.thSorted + (historyTasks.field === 'task' ? ` ${styles.selected}` : '')}>Task ↕</th>
                  <th onClick={() => orderByParameter({ field: 'duration' })} className={styles.thSorted + (historyTasks.field === 'duration' ? ` ${styles.selected}` : '')}>Duration ↕</th>
                  <th onClick={() => orderByParameter({ field: 'date' })} className={styles.thSorted + (historyTasks.field === 'date' ? ` ${styles.selected}` : '')}>Date ↕</th>
                  <th onClick={() => orderByParameter({ field: 'status' })} className={styles.thSorted + (historyTasks.field === 'status' ? ` ${styles.selected}` : '')}>Status ↕</th>
                  <th onClick={() => orderByParameter({ field: 'type' })} className={styles.thSorted + (historyTasks.field === 'type' ? ` ${styles.selected}` : '')}>Type ↕</th>
                </tr>
              </thead>
              <tbody>
                {historyTasks.tasks.map((t, index) => (
                  <tr key={t.id}>
                    <td>{t.task}</td>
                    <td>{t.duration}</td>
                    <td>{getFormattedDate(t.startDate)}</td>
                    <td>
                      {getTaskStatus(t, task.activeTask)}
                    </td>
                    <td>{typeConversion[t.type]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          : <p style={{ textAlign: 'center', fontWeight: 'bold' }}>No history yet. Start a task to see it here!</p>
        }
      </Container>
    </MainTemplate>
  )
}
