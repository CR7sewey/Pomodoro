import './styles/theme.css';
import './styles/global.css';
import { MainTemplate } from './templates/MainTemplate';
import { Home } from './pages/Home';

export function App() {
  return (
    <>
      <MainTemplate>
        <Home />
      </MainTemplate>
    </>
  );
}
