'use client';

import React from 'react';
import HeadingProps from '@/types/HeadingProps';

/**
 * Returns the CSS class string based on the heading level.
 *
 * @param {string} level - The heading level.
 * @returns {string} The CSS class string for the specified heading level.
 */
function getHeadingClass(level: string): string {
  switch (level) {
    case '1':
      return 'antialiased font-bold text-primary text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-snug lg:leading-normal mb-6';
    case '2':
      return 'antialiased font-bold text-primary text-2xl md:text-3xl lg:text-4xl leading-tight md:leading-snug lg:leading-normal mb-5';
    case '3':
      return 'antialiased font-bold text-gray-800 text-xl md:text-2xl lg:text-3xl leading-tight md:leading-snug lg:leading-normal mb-4';
    case '4':
      return 'antialiased font-bold text-gray-800 text-lg md:text-xl lg:text-2xl leading-tight md:leading-snug lg:leading-normal mb-3';
    case '5':
      return 'antialiased font-bold text-gray-800 text-base md:text-lg lg:text-xl leading-tight md:leading-snug lg:leading-normal mb-2';
    case '6':
      return 'antialiased font-bold text-gray-800 text-sm md:text-base lg:text-lg leading-tight md:leading-snug lg:leading-normal mb-1';
    default:
      return '';
  }
}

/**
 * Heading component for rendering different levels of headings with specific styles.
 *
 * This component renders an `h1` to `h6` element based on the `level` prop,
 * applying specific styles for each level.
 *
 * @component
 * @param {HeadingProps} props - The properties for the Heading component.
 * @returns {JSX.Element} The rendered Heading component.
 */
function Heading({ level, children }: HeadingProps): JSX.Element {
  return React.createElement(
    `h${level}`,
    { className: getHeadingClass(level) },
    children || `Heading ${level}`
  );
}

export default Heading;
