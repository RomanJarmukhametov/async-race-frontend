import React from 'react';
import BodyTextProps from '@/types/BodyTextProps';

/**
 * BodyText component for rendering paragraph text with specific styles.
 *
 * This component renders a paragraph (`<p>`) element with styles for font,
 * text color, and line height based on the size prop. It accepts optional children,
 * additional class names, and a prop for text centering.
 * If no children are provided, it displays a default placeholder text.
 *
 * @component
 * @param {BodyTextProps} props - The properties for the BodyText component.
 * @returns {JSX.Element} The rendered BodyText component.
 */
function BodyText({
  children,
  className,
  size,
  center,
}: BodyTextProps): JSX.Element {
  const baseClass = 'antialiased font-normal text-gray-500';
  const sizeClass = (() => {
    switch (size) {
      case 'small':
        return 'text-sm leading-5 md:text-base md:leading-6 lg:text-lg lg:leading-7';
      case 'medium':
        return 'text-base leading-6 md:text-lg md:leading-7 lg:text-xl lg:leading-8';
      case 'large':
        return 'text-lg leading-7 md:text-xl md:leading-8 lg:text-2xl lg:leading-9';
      default:
        return '';
    }
  })();
  const centerClass = center ? 'text-center' : '';

  return (
    <p className={`${baseClass} ${sizeClass} ${centerClass} ${className}`}>
      {children || 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'}
    </p>
  );
}

export default BodyText;
