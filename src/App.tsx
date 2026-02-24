import './styles/theme.css';
import './styles/global.css';
import { MainTemplate } from './templates/MainTemplate';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { AboutPomodoro } from './pages/AboutPomodoro';
import { TaskProvider } from './context/TaskContextProvider';
import { MessagesContainer } from './components/MessagesContainer';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { MainRouter } from './router/MainRouter';
import { use, useEffect, useState } from 'react';

export function App() {
  return (
    <MessagesContainer>
      <TaskProvider>
        <MainRouter />
      </TaskProvider>
    </MessagesContainer>
  );
}
