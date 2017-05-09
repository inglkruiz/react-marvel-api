import React from 'react';
import logo from '../../logo.svg';
import './style.css';

const Header = () => (
  <header className="Header">
    <h1 className="Header-title">ReactJS Marvel Searcher</h1>
    <div className="MarvelBrand">
      <img src={logo} className="img-responsive center-block MarvelBrand-logo" alt="Marvel logo" />
      <small>Data provided by Marvel. © 2017 MARVEL</small>
    </div>
  </header>
);

export default Header;
