import { useEffect, useState } from "react";

export const useLocalStorage = (name: string) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const onChange = () => {
      setValue(localStorage.getItem(name) as any);
    };
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const setStorageValue = (_value) => {
    localStorage.setItem(name, _value);
  };

  return [value, setStorageValue];
};
