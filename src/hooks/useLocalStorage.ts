import { useState } from "react";

export const useLocalStorage = (key: string, initialValue?: any) => {
  const existingValue = localStorage.getItem(key);
  const [value, setValue] = useState(existingValue || initialValue);

  const setStorageValue = (_value) => {
    setValue(_value);
    localStorage.setItem(key, _value);
  };

  return [value, setStorageValue];
};
