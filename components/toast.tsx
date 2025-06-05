import React from 'react';
import { Toast as ToastType } from '../hooks/useToast';

interface ToastProps {
  toast: ToastType;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  const getToastStyles = () => {
    switch (toast.type) {
      case 'success':
        return {
          border: 'border-green-500',
          text: 'text-green-800',
          bg: 'bg-green-100',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          progressBar: 'bg-green-500'
        };
      case 'error':
        return {
          border: 'border-red-500',
          text: 'text-red-800',
          bg: 'bg-red-100',
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          progressBar: 'bg-red-500'
        };
      case 'warning':
        return {
          border: 'border-yellow-500',
          text: 'text-yellow-800',
          bg: 'bg-yellow-100',
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
          progressBar: 'bg-yellow-500'
        };
      default: // info
        return {
          border: 'border-blue-500',
          text: 'text-blue-800',
          bg: 'bg-blue-100',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          progressBar: 'bg-blue-500'
        };
    }
  };

  const styles = getToastStyles();

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      default: // info
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <>
      <div className={`fixed bottom-6 left-6 z-50 max-w-sm transition-all duration-500 ease-in-out transform ${
        toast.isVisible 
          ? 'translate-x-0 opacity-100' 
          : '-translate-x-full opacity-0'
      }`}>
        <div className={`relative rounded-lg shadow-lg border-l-4 p-4 pr-12 bg-white ${styles.border} ${styles.text}`}>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${styles.iconBg}`}>
                <div className={styles.iconColor}>
                  {getIcon()}
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-5">
                {toast.message}
              </p>
            </div>
          </div>
          
          {/* Close button */}
          <button
            onClick={onDismiss}
            className="absolute top-2 right-2 p-1 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <svg className="w-4 h-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Progress bar */}
          <div className={`absolute bottom-0 left-0 h-1 rounded-bl-lg ${styles.progressBar}`}
            style={{
              animation: toast.isVisible ? `toast-progress ${toast.duration || 4000}ms linear forwards` : 'none'
            }}
          ></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes toast-progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </>
  );
};