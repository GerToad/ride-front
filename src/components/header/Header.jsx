import React from 'react';
import "./Header.css";
import { NavLink, Navigate } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Sisterra RR</h1>
      <nav>
        <ul>
          <li><NavLink to="/">Inicio</NavLink></li>
        </ul>
        <div className="user-buttons">
          <button className="login-button"><NavLink to="login">Ingresar</NavLink></button>
          <button className="signin-button"><NavLink to="register">Registarse</NavLink></button>
        </div>      
      </nav>
    </header>
  );
}

export default Header;
