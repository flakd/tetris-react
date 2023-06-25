import './GameController.css';

import {useEffect, useState} from 'react';
import Modal from 'react-overlays/Modal';
import './Modal.css';

import {Action, actionForKey, actionIsDrop} from '../business/Input';
import {playerController} from '../business/PlayerController';

import {useDropTime} from '../hooks/useDropTime';
import {useInterval} from '../hooks/useInterval';
import useSound from 'use-sound';
import leftRightURL from '../sounds/pop-down.mp3';
import rotateURL from '../sounds/pop-up-on.mp3';
import fastDropURL from '../sounds/pop-up-off.mp3';

const GameController = ({
  board,
  gameStats,
  player,
  setGameOver,
  setPlayer,
  setGameStart,
}) => {
  const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({
    gameStats,
  });
  const [gameIsPaused, setGameIsPaused] = useState(false);
  const setGameIsPausedToTrue = () => setGameIsPaused(true);
  const setGameIsPausedToFalse = () => setGameIsPaused(false);
  const [showModal, setShowModal] = useState(false);
  const handleContinue = () => {
    setShowModal(false);
    resumeDropTime();
    setGameIsPaused(false);
  };
  const renderBackdrop = (props) => (
    <div
      {...props}
      className='backdrop'
    />
  );

  const [playBackRate, setPlayBackRate] = useState(0.75);
  const [playLeftRight] = useSound(leftRightURL, {playBackRate, volume: 0.5});
  const [playRotate] = useSound(rotateURL, {playBackRate, volume: 0.5});
  const [playFastDrop] = useSound(fastDropURL, {playBackRate, volume: 0.5});

  useInterval(() => {
    handleInput({action: Action.SlowDrop});
  }, dropTime);

  const onKeyUp = ({code}) => {
    const action = actionForKey(code);
    if (actionIsDrop(action)) resumeDropTime();
  };

  const onKeyDown = ({code}) => {
    const action = actionForKey(code);

    if (action === Action.Pause) {
      if (dropTime) {
        pauseDropTime();
        setGameIsPaused(true);
      } else {
        resumeDropTime();
        setGameIsPaused(false);
      }
    } else if (action === Action.Quit) {
      pauseDropTime();

      setGameOver(true);
      setGameStart(false);
    } else {
      if (actionIsDrop(action)) pauseDropTime();
      if (!dropTime) {
        return;
      }

      if (action === Action.Left) {
        playLeftRight();
      }
      if (action === Action.Right) {
        playLeftRight();
      }
      if (action === Action.Rotate) {
        playRotate();
      }
      if (action === Action.SlowDrop) {
        setPlayBackRate(playBackRate + 0.1);
        playLeftRight({playBackRate: 2.0, volume: 1.0});
      }
      if (action === Action.FastDrop) {
        setPlayBackRate(playBackRate + 0.1);
        playFastDrop();
      }

      handleInput({action});
    }
  };

  const handleInput = ({action}) => {
    playerController({
      action,
      board,
      player,
      setPlayer,
      setGameOver,
    });
  };
  return (
    <>
      <input
        className='GameController'
        type='text'
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        autoFocus
        tabIndex={0}
      />

      <Modal
        className='modal'
        /* show={showModal} */
        show={gameIsPaused}
        onHide={handleContinue}
        renderBackdrop={renderBackdrop}
      >
        <div>
          <div className='modal-header'>
            <div className='modal-title'>Game Paused</div>
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
            {/* <p>Press P Again or Click CONTINUE</p> */}
          </div>
          <div className='modal-footer'>
            <button
              className='secondary-button'
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default GameController;
