import React from 'react';
import './Welcome.css';
import { NavLink, Navigate } from 'react-router-dom';

const Welcome = ({ user }) => {
  return (
    <div className='welcome'>
      {user ? (
        <h1>Bienvenido, {user}!</h1>
      ) : (
        <h1>Bienvenido! Por favor <NavLink to="/register">registrese</NavLink> para empezar a administrar su flujo de trabajo.</h1>
      )}
    </div>
  );
};

export default Welcome;
