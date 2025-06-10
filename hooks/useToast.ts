
import { useState, useCallback } from 'react';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  isVisible: boolean;
  duration?: number;
}

export const useToast = () => {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = useCallback((
    message: string, 
    type: Toast['type'] = 'info', 
    duration: number = 4000
  ) => {
    const id = Date.now().toString();
    
    setToast({
      id,
      message,
      type,
      isVisible: true,
      duration
    });

    // Auto-dismiss after duration
    setTimeout(() => {
      setToast(prev => prev ? { ...prev, isVisible: false } : null);
    }, duration);

    // Remove from DOM after animation completes
    setTimeout(() => {
      setToast(null);
    }, duration + 500);
  }, []);

  const dismissToast = useCallback(() => {
    setToast(prev => prev ? { ...prev, isVisible: false } : null);
    setTimeout(() => {
      setToast(null);
    }, 500);
  }, []);

  return {
    toast,
    showToast,
    dismissToast
  };
};
