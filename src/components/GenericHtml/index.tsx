import React, { useState } from 'react';
import styles from './styles.module.css';

// component to render html elements
export function GenericHtml({ children }: { children: React.ReactNode }) {
  return <div className={styles.genericHtml}>{children}</div>;
}
