import {useState, useCallback} from 'react';

export const useGameStart = () => {
  const [gameStart, setGameStart] = useState(true);

  const resetGameStart = useCallback(() => {
    setGameStart(false);
  }, []);

  return [gameStart, setGameStart, resetGameStart];
};
