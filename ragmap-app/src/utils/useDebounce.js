// src/utils/useDebounce.js
import { useState, useEffect } from "react";

/**
 * Returns a debounced value that only updates after the specified delay.
 * @param {any} value - The input value to debounce.
 * @param {number} delay - Delay in milliseconds.
 * @returns {any} debouncedValue
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
