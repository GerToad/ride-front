import React from 'react';
import "./Header.css";

function Header() {
  return (
    <header>
      <h1>Sisterra RR</h1>
      <nav>
        <ul>
          <li><a href="#">Inicio</a></li>
        </ul>
        <div className="user-buttons">
          <button className="login-button">Ingresar</button>
          <button className="signin-button">Registrate</button>
        </div>      
      </nav>
    </header>
  );
}

export default Header;
