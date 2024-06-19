/**
 * Props for the Wrapper component.
 */
interface WrapperProps {
  as?: 'header' | 'section' | 'div' | 'footer';
  id?: string;
  children?: React.ReactNode;
  className?: string;
}

export default WrapperProps;
