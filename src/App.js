import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/Signup'
import HomeScreen from './components/HomeScreen'
import EditProfile from './components/EditProfile'
import ChangePassword from './components/ChangePassword'
import BasePage from './components/BasePage'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={BasePage} />
        <Route path="/sign-in" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/home" component={HomeScreen} />
        <Route path="/edit" component={EditProfile} />
        <Route path="/change-password" component={ChangePassword} />
      </Switch>
    </Router>
  );
}

export default App;
