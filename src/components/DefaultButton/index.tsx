import React, { useState } from 'react';
import styles from './styles.module.css';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';

type ButtonProps = {
  btn?: boolean;
  type?: 'submit' | 'button' | 'reset';
  icon?: React.ReactNode;
  color?: string;
} & React.ComponentProps<'button'>;

export function DefaultButton({
  btn = true,
  type = 'button',
  icon = null,
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
        {icon ? icon : btn === true ? <StopCircleIcon /> : <PlayCircleIcon />}
      </button>
    </>
  );
}
