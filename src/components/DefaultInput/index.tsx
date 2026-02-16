import React, { useState } from 'react';
import styles from './styles.module.css';

type InputProps = {
  label?: string;
  id: string;
  type: 'text' | 'number' | 'search';
  placeholder?: string;
} & React.ComponentProps<'input'>;

export function DefaultInput({
  label,
  id,
  type,
  placeholder,
  ...rest
}: InputProps) {
  return (
    <>
      {label ?? <label htmlFor={id}>{label}:</label>}
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder ?? ''}
        id={id}
        {...rest}
      />
    </>
  );
}
