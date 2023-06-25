import './Tetris.css';
import {useState} from 'react';
import Board from './Board';
import GameController from './GameController';
import GameStats from './GameStats';
import Previews from './Previews';

import {useBoard} from '../hooks/useBoard';
import {useGameStats} from '../hooks/useGameStats';
import {usePlayer} from '../hooks/usePlayer';

const Tetris = ({rows, columns, setGameOver, gameOver, setGameStart}) => {
  const [gameStats, addLinesCleared] = useGameStats();
  const [player, setPlayer, resetPlayer] = usePlayer();
  const [board, setBoard] = useBoard({
    rows,
    columns,
    player,
    resetPlayer,
    addLinesCleared,
  });

  const onKeyDown = ({code}) => {
    console.log(code);
  };

  return (
    <div
      className='Tetris'
      onKeyDown={onKeyDown}
      tabIndex='0'
      autoFocus={true}
    >
      <Board board={board} />
      <GameStats gameStats={gameStats} />
      <Previews tetrominoes={player.tetrominoes} />
      <GameController
        board={board}
        gameStats={gameStats}
        player={player}
        setGameOver={setGameOver}
        setGameStart={setGameStart}
        setPlayer={setPlayer}
      />
    </div>
  );
};

export default Tetris;
