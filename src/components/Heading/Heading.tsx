import styles from './styles.module.css';

type HeadingProps = {
  children: React.ReactNode;
  className?: string;
};

export const Heading = ({ ...props }: HeadingProps) => {
  return (
    <div className={`${styles.heading} ${props.className || ''}`}>
      {props.children}
    </div>
  );
};
