import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './views/Login'
import Register from './views/Register'
import WelcomeView from './views/Welcome'
import Genres from './views/Genres'
import Themes from './views/Themes'
import CalculateBooks from './views/CalculateBooks'
import HomePage from './views/HomePage'
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from'./components/PublicRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute restricted={false} path="/" component={HomePage} exact/>
          <PrivateRoute restricted={true} path="/calculatebooks" component={CalculateBooks}  exact/>
          <PrivateRoute restricted={true} path="/themes" component={Themes} exact/>
          <PrivateRoute restricted={true} path="/genres" component={Genres} exact/>
          <PrivateRoute restricted={true} path="/welcome" component={WelcomeView} exact/>
          <PublicRoute path="/register" component={Register} exact/>
          <PublicRoute path="/login" component={Login} exact/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
