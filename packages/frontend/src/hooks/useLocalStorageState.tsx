import { useState } from "react";

export const useLocalStorageState = <T extends any>(
  key: string,
  initialValue: T,
) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = safeParseLocalStorage(key);
    return item !== undefined ? item : initialValue;
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {}
  };

  return [storedValue, setValue] as const;
};

const safeParseLocalStorage = (key: string) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  } catch (error) {
    return undefined;
  }
};
