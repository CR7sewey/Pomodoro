import './styles/theme.css';
import './styles/global.css';
import { Container } from './components/Container/Container';
import { Logo } from './components/Logo/Logo';

export function App() {
  return (
    <>
      <Container>
        <Logo />
      </Container>
      <Container>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde minima
          quasi iusto, rerum impedit mollitia. Velit vitae, minima sapiente
          fugiat tempore officiis corporis doloremque, doloribus id, beatae
          porro. Asperiores, culpa.
        </p>
      </Container>
    </>
  );
}
