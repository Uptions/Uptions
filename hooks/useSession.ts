
import { useState, useEffect, useRef, useCallback } from 'react';

export const useSessionStorage = (key: string, initialValue: any) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isInitialized = useRef(false);
  
  // Initialize state with a function to avoid multiple calls
  const [storedValue, setStoredValue] = useState(() => {
    // Only try to read from sessionStorage on client-side
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.sessionStorage.getItem(key);
      if (item) {
        const parsedItem = JSON.parse(item);
        // Set loaded to true since we successfully loaded
        setTimeout(() => setIsLoaded(true), 0);
        return parsedItem;
      }
    } catch (error) {
      console.error(`Error reading sessionStorage key "${key}":`, error);
    }
    
    // Set loaded to true even if no item found
    setTimeout(() => setIsLoaded(true), 0);
    return initialValue;
  });

  // Ensure isLoaded is set to true after initial render
  useEffect(() => {
    if (!isInitialized.current) {
      setIsLoaded(true);
      isInitialized.current = true;
    }
  }, []);

  // Function to update value - Fixed to prevent infinite re-renders
  const setValue = useCallback((value: ((val: typeof initialValue) => typeof initialValue) | typeof initialValue) => {
    try {
      setStoredValue((currentValue: typeof initialValue) => {
        const valueToStore = typeof value === 'function' ? (value as (val: typeof initialValue) => typeof initialValue)(currentValue) : value;
        
        // Save to sessionStorage
        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
        }
        
        return valueToStore;
      });
    } catch (error) {
      console.error(`Error setting sessionStorage key "${key}":`, error);
    }
  }, [key]);

  // Function to remove item from sessionStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing sessionStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue, isLoaded];
};