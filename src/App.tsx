import { useState, useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [counter, setCounter] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // useRef to store the interval ID - saves the interval ID across renders without causing re-renders

  const startTimer = () => {
    if (isRunning) {
      // Pause the timer
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setIsRunning(false);
    } else {
      // Start or resume the timer
      setIsRunning(true);
      const id = setInterval(() => {
        setCounter(prevCounter => {
          if (prevCounter > 0) {
            return prevCounter - 1;
          } else {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            setIsRunning(false);
            return 0;
          }
        });
      }, 1000);
      intervalRef.current = id;
    }
  };

  return (
    <>
      <div>
        <a href='https://vite.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button
          onClick={() => {
            setCount(count => {
              const newCount = count + 1;
              localStorage.setItem('count', String(newCount));
              return newCount;
            });
          }}
        >
          count is {count}
        </button>
        <button onClick={startTimer}>
          {isRunning ? 'Pause' : 'Start'} - {counter}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
