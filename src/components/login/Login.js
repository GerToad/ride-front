import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/user/login", 
                { email, password },
                {headers: { "content-type": "application/json" }});
      const { user, token } = response.data;

      // Do something with the user object and token, such as saving them to the state or local storage
      // Save user and token in local storage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      // Reset the form fields
      setEmail("");
      setPassword("");
      history("/");
      window.location.reload();
    } catch (error) {
      // Handle error, such as displaying an error message
      console.error(error);
    }
  };

  return (
    <div className="login">
      <h2>Ingresar</h2>
      <form >
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>Ingresar</button>
      </form>
    </div>
  );
};

export default Login;

