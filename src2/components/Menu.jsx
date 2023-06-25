import React from 'react';
import './Menu.css';

const Menu = ({onClick}) => {
  return (
    <div className='menu'>
      <button
        className='button'
        onClick={onClick}
      >
        Play Tetris
      </button>
    </div>
  );
};

export default Menu;
