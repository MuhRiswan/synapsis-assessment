import { useEffect, useState } from "react";

/**
 * Custom hook to debounce a value by the specified delay.
 * @param value - The value to debounce (e.g., search term).
 * @param delay - The delay in milliseconds before updating the debounced value.
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timer to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup the timer if the value or delay changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
