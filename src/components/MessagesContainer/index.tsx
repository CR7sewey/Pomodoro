import React from 'react';
import { ToastContainer } from 'react-toastify';

export const MessagesContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar={false}
        draggable
      />{' '}
      {children}
    </>
  );
};
