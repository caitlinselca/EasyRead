import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './views/Login'
import Register from './views/Register'
import WelcomeView from './views/Welcome'
import Genres from './components/Genres'
import Subjects from './components/Subjects'
import CalculateBooks from './views/CalculateBooks'
import HomePage from './views/HomePage'
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from'./components/PublicRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute path="/" component={HomePage} exact/>
          <PrivateRoute path="/calculatebooks" component={CalculateBooks}  exact/>
          <PrivateRoute path="/subjects" component={Subjects} exact/>
          <PrivateRoute path="/genres" component={Genres} exact/>
          <PrivateRoute path="/welcome" component={WelcomeView} exact/>
          <PublicRoute restricted={true} path="/register" component={Register} exact/>
          <PublicRoute restricted={true} path="/login" component={Login} exact/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
