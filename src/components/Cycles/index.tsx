import styles from './styles.module.css';
import useTaskContext from '../../context/useTaskContext';

export function Cycles() {
  const { task } = useTaskContext();

  const cycleColors = {
    workDuration: styles.workTime,
    shortBreakDuration: styles.shortBreakTime,
    longBreakDuration: styles.longBreakTime,
  };

  return (
    <div className={styles.cycles}>
      <span>Cycles:</span>
      <div className={styles.cycleDots}>
        {task.tasks.map((t, index) => {
          const cycleType = t.type;
          const dotClass = cycleColors[cycleType];
          return (
            <span
              key={`cycle-dot-${t.id}`}
              className={`${styles.cycleDot} ${dotClass}`}
              aria-label={`Cycle ${index + 1}: ${cycleType}`}
            >
              {'   '}
            </span>
          );
        })}
      </div>
    </div>
  );
}
