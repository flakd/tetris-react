// Desc: useBoard hook
import React, {useState} from 'react';
import {buildBoard} from '../business/Board';

export const useBoard = ({rows, columns}) => {
  //const [board, setBoard] = useState(buildBoard({rows, columns}));
  //return [board, setBoard];
  const [board] = useState(buildBoard({rows, columns}));
  return [board];
};
