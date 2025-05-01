import { useState, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface ToastOptions {
  message: string;
  type?: ToastType;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);

  const toast = useCallback(({ message, type = 'info' }: ToastOptions) => {
    // For simplicity, just log the toast message.
    // In a real app, you might show a toast UI component here.
    console.log(`[${type.toUpperCase()}] ${message}`);

    // Add toast to state (optional, for UI)
    setToasts((prev) => [...prev, { message, type }]);

    // Remove toast after 3 seconds (optional)
    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3000);
  }, []);

  return { toast, toasts };
};
