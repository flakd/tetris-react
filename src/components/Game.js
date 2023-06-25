import {useEffect, useState} from 'react';
import Menu from './Menu';
import Tetris from './Tetris';
import Modal from 'react-overlays/Modal';
import track1 from '../sounds/track1.mp3';

import {useGameOver} from '../hooks/useGameOver';
import {useGameStart} from '../hooks/useGameStart';

let counter = 1;

const Game = ({rows, columns}) => {
  const [gameOver, setGameOver, resetGameOver] = useGameOver(false);
  //const [gameStart, setGameStart] = useState(true);
  const [gameStart, setGameStart, resetGameStart] = useGameStart(true);
  const [showModal, setShowModal] = useState(!gameStart);

  //const start = () => resetGameOver();
  const start = () => {
    resetGameStart();

    const music = new Audio(track1);
    music.loop = true;
    music.play();
  };
  console.log('gameOver', gameOver);
  console.log('gameStart', gameStart);

  /*   useEffect(
    () => {
      if (counter > 1) {
        setShowModal(gameStart);
        //setGameStart(gameOver);
        console.log('gameOver', gameOver);
        console.log('showModal', showModal);
      }
      console.log('counter', counter);
      counter++;
    },
    [gameOver],
    [gameStart],
    [showModal]
  ); */

  useEffect((effect) => {
    document.addEventListener('keydown', onKeyDownTest);
    document.addEventListener('keyup', onKeyUpTest);
  }, []);

  const onKeyDownTest = ({code}) => {
    //console.log('onKeyDownTest', code);
  };
  const onKeyUpTest = ({code}) => {
    //console.log('onKeyUpTest', code);
  };

  const handleContinue = () => {
    console.log('handleContinue');
    //setShowModal(false);
    setGameOver(false);
    setGameStart(true);
  };
  const renderBackdrop = (props) => (
    <div
      {...props}
      className='backdrop'
    />
  );

  return (
    <div className='Game'>
      {gameStart ? (
        <Menu onClick={start} />
      ) : (
        <Tetris
          rows={rows}
          columns={columns}
          setGameOver={setGameOver}
          gameOver={gameOver}
          setGameStart={setGameStart}
        />
      )}
      <Modal
        className='modal'
        show={gameOver && !gameStart}
        onHide={handleContinue}
        renderBackdrop={renderBackdrop}
      >
        <div>
          <div className='modal-header'>
            <div className='modal-title'>Game Over</div>
            <div>
              <span
                className='close-button'
                onClick={handleContinue}
              >
                x
              </span>
            </div>
          </div>
          <div className='modal-desc'>
            <p>Play Another?</p>
          </div>
          <div className='modal-footer'>
            <button
              className='secondary-button'
              onClick={handleContinue}
            >
              OK
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Game;
