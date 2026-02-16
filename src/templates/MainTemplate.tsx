import React, { useState } from 'react';
import Logo from '../components/Logo';
import { menuItems } from '../utils/constants';
import Container from '../components/Container';
import Menu from '../components/Menu';
import { Footer } from '../components/Footer';

export const MainTemplate = ({ children }: { children: React.ReactNode }) => {
  const [navItems, setNavItems] = useState(menuItems);

  return (
    <>
      <Container>
        <Logo />
      </Container>
      <Container>
        <Menu navItems={navItems} setNavItems={setNavItems} />
      </Container>
      {children}
      <Container>
        <Footer />
      </Container>
    </>
  );
};
