import { useState, SetStateAction } from "react";

export const useObjectState = <T>(
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<any>>] => {
  const [value, setValue] = useState<T>(initialValue);

  const setObjectValue = (values: SetStateAction<any>): void => {
    setValue((prev: any) => {
      return { ...(prev || {}), ...values };
    });
  };

  return [value, setObjectValue];
};
