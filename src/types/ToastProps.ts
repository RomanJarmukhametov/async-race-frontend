/* ToastProps is a type that is used to pass the message, duration, and onClose to the Toast component */
interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

export default ToastProps;
