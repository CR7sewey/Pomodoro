import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import { MainTemplate } from '../../templates/MainTemplate'
import Heading from '../../components/Heading'
import styles from './styles.module.css'
import { TrashIcon } from 'lucide-react'
import { DefaultButton } from '../../components/DefaultButton'
import useTaskContext from '../../context/useTaskContext'
import { typeConversion, type TaskStateModel } from '../../models/TaskModel'
import { formatSecondsToMinutes } from '../../utils/methods'

export const History = () => {
  const { task } = useTaskContext();
  const [historyTasks, setHistoryTasks] = useState(() => {
    return {
      tasks: [...task.tasks],
      field: 'date',
      direction: 'asc',
    }
  });

  useEffect(() => {
    setHistoryTasks(prev => ({ ...prev, tasks: [...task.tasks] }));
  }, [task.tasks]);

  const orderByParameter = ({ field }: Pick<typeof historyTasks, 'field'>) => {
    setHistoryTasks(prev => ({ ...prev, field, direction: prev.direction === 'asc' ? 'desc' : 'asc' }));

    const sortedTasks = [...historyTasks.tasks].sort((a, b) => {
      if (historyTasks.field === 'task') {
        if (historyTasks.direction === 'asc') {
          return a.task.localeCompare(b.task); // sort by task name (string)
        }
        return b.task.localeCompare(a.task); // sort by task name (string)
      }
      if (historyTasks.field === 'duration') {
        if (historyTasks.direction === 'asc') {
          return a.duration - b.duration; // sort by duration (number)
        }
        return b.duration - a.duration; // sort by duration (number)
      } else if (historyTasks.field === 'date') {
        if (historyTasks.direction === 'asc') {
          return a.startDate - b.startDate; // sort by start date (number)
        }
        return b.startDate - a.startDate; // sort by start date (number)
      } else if (historyTasks.field === 'status') {
        const statusA = a.endDate ? 'Completed' : a.interruptedDate ? 'Interrupted' : 'In Progress';
        const statusB = b.endDate ? 'Completed' : b.interruptedDate ? 'Interrupted' : 'In Progress';
        if (historyTasks.direction === 'asc') {
          return statusA.localeCompare(statusB); // sort by status (string)
        }
        return statusB.localeCompare(statusA); // sort by status (string)
      } else if (historyTasks.field === 'type') {
        const typeA = typeConversion[a.type];
        const typeB = typeConversion[b.type];
        if (historyTasks.direction === 'asc') {
          return typeA.localeCompare(typeB); // sort by type (string)
        }
        return typeB.localeCompare(typeA); // sort by type (string)
      }
    });
    setHistoryTasks((prev) => {
      return {
        ...prev,
        tasks: sortedTasks,
      }
    });
  };


  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          <span className={styles.buttonContainer}>
            {task.tasks.length > 0 && (
              <DefaultButton
                icon={<TrashIcon />}
                color='red'
                aria-label='Apagar todo o histórico'
                title='Apagar histórico'
                onClick={() => { }}
              />
            )}

          </span>
        </Heading>
      </Container>
      <Container>
        <div className={styles.responsiveTable}>
          <table>
            <thead>
              <tr>
                <th onClick={() => orderByParameter({ field: 'task' })} className={historyTasks.field === 'task' ? styles.selected : ''}>Task ↕</th>
                <th onClick={() => orderByParameter({ field: 'duration' })} className={historyTasks.field === 'duration' ? styles.selected : ''}>Duration ↕</th>
                <th onClick={() => orderByParameter({ field: 'date' })} className={historyTasks.field === 'date' ? styles.selected : ''}>Date ↕</th>
                <th onClick={() => orderByParameter({ field: 'status' })} className={historyTasks.field === 'status' ? styles.selected : ''}>Status ↕</th>
                <th onClick={() => orderByParameter({ field: 'type' })} className={historyTasks.field === 'type' ? styles.selected : ''}>Type ↕</th>
              </tr>
            </thead>
            <tbody>
              {historyTasks.tasks.map((t, index) => (
                <tr key={t.id}>
                  <td>{t.task}</td>
                  <td>{t.duration}</td>
                  <td>{new Date(t.startDate).toLocaleString()}</td>
                  <td>
                    {t.endDate
                      ? 'Completed'
                      : t.interruptedDate
                        ? 'Interrupted'
                        : 'In Progress'}
                  </td>
                  <td>{typeConversion[t.type]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


      </Container>
    </MainTemplate>
  )
}
