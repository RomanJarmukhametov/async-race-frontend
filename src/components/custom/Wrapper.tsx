'use client';

import React from 'react';
import WrapperProps from '@/types/WrapperProps';

/**
 * Wrapper component that renders different HTML elements with responsive padding.
 * @param {WrapperProps} props - The props for the Wrapper component.
 * @returns The Wrapper component.
 */
function Wrapper({ as = 'div', children, className, id }: WrapperProps) {
  const Component = as;

  const paddingClasses = (() => {
    switch (Component) {
      case 'header':
        return 'px-4 py-6 md:px-8 md:py-10 lg:px-12 lg:py-14';
      case 'section':
        return 'px-6 py-8 md:px-10 md:py-12 lg:px-14 lg:py-16';
      case 'div':
        return 'px-4 py-6 md:px-8 md:py-10 lg:px-12 lg:py-14';
      case 'footer':
        return 'px-4 py-6 md:px-8 md:py-10 lg:px-12 lg:py-14';
      default:
        return '';
    }
  })();

  return (
    <Component
      className={`${paddingClasses} ${className}`}
      id={id}
    >
      {children}
    </Component>
  );
}

export default Wrapper;
