import React, {Component} from 'react';
import  { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/header/Header';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Welcome from './components/welcome/Welcome';
import RouteForm from './components/routes/RouteForm';

class Router extends Component {

  render(){
    return (
      <BrowserRouter>
        <Header />
        {/* Routes */}
        <Routes>
          <Route exact path="/" element={<Welcome/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/routes" element={<RouteForm/>}/>
          <Route path="*" element={<Welcome/>}/>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default Router;

