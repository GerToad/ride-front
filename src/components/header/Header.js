import React, {useState, useEffect} from 'react';
import "./Header.css";
import { NavLink } from 'react-router-dom';

function Header() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    useEffect(() => {
        // Update the user state when it changes in localStorage
        setUser(JSON.parse(localStorage.getItem('user')));
    }, []);
    const handleLogout = () => {
    // Remove user from local storage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.reload();
        setUser(null)
    };

  return (
    <header>
      <h1><NavLink to="/">Sisterra RR</NavLink></h1>
      <nav>
        {!user ? (
            <div className="user-buttons">
                <button className="login-button"><NavLink to="login">Ingresar</NavLink></button>
                <button className="signin-button"><NavLink to="register">Registarse</NavLink></button>
            </div>      
        ) : (
            <div>
                <button className="logout-button" onClick={handleLogout}>
                   Cerrar sesión 
                </button> 
            </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
