import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const history = useNavigate()// State variables for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    // Create an object with the user data
    const userData = {
      name,
      email,
      password,
    };

    try {
      // Send a POST request to the backend endpoint
      const response = await axios.post("http://localhost:5000/user/create", 
                userData,
                {headers: { "content-type": "application/json" }});

      // Handle the response or perform any additional actions
      console.log(response.data);
      history("/home"); // Navigate to the home component
    } catch (error) {
      // Handle any errors that occurred during the request
      console.log(error);
    }
    // If registration is successful
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit" onClick={handleRegister}>Registrate</button>
      </form>
    </div>
  );
};

export default Register;

