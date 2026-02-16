import './styles/theme.css';
import './styles/global.css';
import { MainTemplate } from './templates/MainTemplate';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { AboutPomodoro } from './pages/AboutPomodoro';

export function App() {
  return (
    <>
      <Home />
      <NotFound />
      <AboutPomodoro />
    </>
  );
}
