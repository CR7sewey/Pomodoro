import { useContext } from 'react';
import { TaskContext, type TaskContextType } from './TaskContext';

export default function useTaskContext(): TaskContextType {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}
