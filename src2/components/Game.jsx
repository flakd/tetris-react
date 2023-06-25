import React from 'react';
import Menu from './Menu';
import useGameOver from '../hooks/useGameOver';
import Tetris from './Tetris';

const Game = ({rows, columns}) => {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();

  const startGame = () => {
    console.log('calling resetGameOver: gameOver is', gameOver);
    resetGameOver();
    console.log('just called resetGameOver: gameOver is', gameOver);
  };

  return (
    <div className='game'>
      {gameOver ? (
        <Menu onClick={startGame} />
      ) : (
        <Tetris
          rows={rows}
          columns={columns}
          setGameOver={setGameOver}
        />
      )}
    </div>
  );
};

export default Game;
