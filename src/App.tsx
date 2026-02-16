import './styles/theme.css';
import './styles/global.css';
import Container from './components/Container';
import Logo from './components/Logo';
import Menu from './components/Menu';
import { useState } from 'react';
import { menuItems } from './utils/constants';
import { CountDown } from './components/CountDown';
import { MainForm } from './components/MainForm';
import { Cycles } from './components/Cycles';
import { Footer } from './components/Footer';

export function App() {
  const [navItems, setNavItems] = useState(menuItems);
  const [test, setTest] = useState(0);
  console.log('App rendered', { test });
  return (
    <>
      <Container>
        <Logo />
      </Container>
      <Container>
        <p onClick={() => setTest(test + 1)}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde minima
          quasi iusto, rerum impedit mollitia. Velit vitae, minima sapiente
          fugiat tempore officiis corporis doloremque, doloribus id, beatae
          porro. Asperiores, culpa.
        </p>
      </Container>
      <Container>
        <Menu navItems={navItems} setNavItems={setNavItems} />
      </Container>
      <Container>
        <CountDown />
      </Container>
      <Container>
        <MainForm />
      </Container>
      <Container>
        <Footer />
      </Container>
    </>
  );
}
