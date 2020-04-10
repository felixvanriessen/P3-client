import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom'
import LandingPage from './pages/main/LandingPage'
import CarInfo from './pages/car/CarInfo';
import UserProfile from './pages/user/UserProfile'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/car/:id' component={CarInfo} />
        <Route exact path='/profile' component={UserProfile}/>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/login' component={Login}/>
      </Switch>
    </div>
  );
}

export default App;
