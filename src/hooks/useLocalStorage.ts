import { useState } from "react";

export const useLocalStorage = (key: string, initialValue?: any) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialValue);

  const setStorageValue = (_value) => {
    setValue(_value);
    localStorage.setItem(key, _value);
  };

  return [value, setStorageValue];
};
