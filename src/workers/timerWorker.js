/*
A web worker is an external JavaScript file that runs in the background, without affecting the performance of the page.

In this case, the timerWorker.js file is a web worker that handles the timing logic for the Pomodoro timer. It listens for messages from the main thread (the React app) and performs actions based on the type of message received.

The worker can handle three types of messages:
1. 'start': Starts the timer with a specified duration.
2. 'stop': Stops the timer and clears any existing intervals.
3. 'reset': Resets the timer to its initial state.
*/
let isRunning = false;

self.onmessage = function (event) {
  // receives the message from the main thread and performs actions based on the type of message received
  if (isRunning) return;

  isRunning = true;

  const state = event.data;
  const { activeTask, secondsRemaining } = state;

  const endDate = activeTask.startDate + secondsRemaining * 1000;
  const now = Date.now();
  let countDownSeconds = Math.ceil((endDate - now) / 1000);
  self.postMessage(countDownSeconds);

  function tick() {
    // sends a message back to the main thread with the remaining seconds every second

    if (state.activeTask === null) {
      isRunning = false;
      return () => clearInterval(tick);
    }

    self.postMessage(countDownSeconds);

    const now = Date.now();
    countDownSeconds = Math.floor((endDate - now) / 1000);

    setTimeout(tick, 1000);
  }

  tick();
};
