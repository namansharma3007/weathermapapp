import React from 'react';
import ICON from '../../Assets/icon.png';
import './Header.css';

const Header = () => {
  return (
    <header className='header-name'>
        <img src={ICON} alt="icon" />
        <h1>Weather Application</h1>
      </header>
  )
}

export default Header