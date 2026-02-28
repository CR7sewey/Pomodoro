import React from 'react'
import { href, Link } from 'react-router';

type RouterLinkCustomProps = {
  href: string;
  to?: {
    pathname: string,
    search?: string,
    hash?: string,
  };
  className?: string;
  children?: React.ReactNode;
} & React.ComponentProps<'a'>;

export const RouterLinkCustom = ({ href, to, children, className, ...props }: RouterLinkCustomProps) => {
  return (
    <Link to={to ?? { pathname: href }} className={className} {...props}>{children}</Link>
  )
}
