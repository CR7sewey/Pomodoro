import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router/dom';
import { NotFound } from '../pages/NotFound';
import { Home } from '../pages/Home';
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  useLocation,
} from 'react-router';
import { AboutPomodoro } from '../pages/AboutPomodoro';

// guarantees that the page scrolls to the top when navigating to a new route
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export const MainRouter = () => {
  const router = createBrowserRouter([
    {
      index: true,
      path: '/',
      element: <Home />,
    },
    {
      path: '/about-pomodoro',
      element: <AboutPomodoro />, // Replace with the actual component for the about page
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);
  /*return (
    <>
      <RouterProvider router={router} />
    </>
  );*/
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/about-pomodoro' element={<AboutPomodoro />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
};
