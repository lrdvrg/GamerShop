import { Game } from '@/utils/endpoint';
import { useState } from 'react';

const useLocalStorage = (key: string, initialValue: Game[]) => {
  const [state, setState] = useState(() => {
    try {
      let value = undefined;
      if (typeof window !== 'undefined') {
        value = window?.localStorage.getItem(key);
      }

      return value ? JSON.parse(value) : initialValue;
    } catch (error) {
      console.log(error);
    }
  });

  const setValue = (value: Game[]) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setState(value);
    } catch (error) {
      console.log(error);
    }
  };

  return [state, setValue];
};

export default useLocalStorage;
