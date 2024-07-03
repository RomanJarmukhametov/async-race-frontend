import { useEffect } from 'react';
import ToastProps from '@/types/ToastProps';

function Toast({ message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration); // Hide toast after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed bottom-20 right-5 bg-gray-800 text-white p-2 rounded">
      {message}
    </div>
  );
}

export default Toast;
