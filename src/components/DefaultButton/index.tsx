import React, { useState } from 'react';
import styles from './styles.module.css';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';

type ButtonProps = {
  btn: boolean;
  setBtn: React.Dispatch<React.SetStateAction<boolean>>;
  type: 'submit' | 'button' | 'reset';
  color?: string;
} & React.ComponentProps<'button'>;

export function DefaultButton({
  btn,
  setBtn,
  type,
  color = 'green',
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <>
      <button
        type={type}
        {...rest}
        className={`${styles.button} ${styles[color]}`}
        onClick={onClick}
      >
        {btn === true ? <StopCircleIcon /> : <PlayCircleIcon />}
      </button>
    </>
  );
}
