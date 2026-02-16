import React from 'react';
import Container from '../../components/Container';
import { CountDown } from '../../components/CountDown';
import { MainForm } from '../../components/MainForm';
import { Footer } from '../../components/Footer';

export function Home() {
  return (
    <>
      <Container>
        <CountDown />
      </Container>
      <Container>
        <MainForm />
      </Container>
    </>
  );
}
