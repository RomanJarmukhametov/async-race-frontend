import { useEffect } from 'react';
import ToastProps from '@/types/ToastProps';

function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Hide toast after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-20 right-5 bg-gray-800 text-white p-2 rounded">
      {message}
    </div>
  );
}

export default Toast;
