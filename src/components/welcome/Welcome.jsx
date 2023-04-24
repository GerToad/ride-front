import React from 'react';
import './Welcome.css';

const Welcome = ({ user }) => {
  return (
    <div className='welcome'>
      {user ? (
        <h1>Bienvenido, {user}!</h1>
      ) : (
        <h1>Bienvenido! Por favor <a href="#">registrese</a> para empezar a administrar su flujo de trabajo.</h1>
      )}
    </div>
  );
};

export default Welcome;
