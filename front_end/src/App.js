import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './views/Login'
import Register from './views/Register'
import WelcomeView from './views/Welcome'
import Genres from './components/Genres'
import Subjects from './components/Subjects'
import CalculateBooks from './views/CalculateBooks'
import HomePage from './views/HomePage'

function App() {
  return (
  <div className="App">
    <Router>
      <Switch>
        <Route path="/calculatebooks" component={CalculateBooks} />
        <Route path="/subjects" component={Subjects} />
        <Route path="/genres" component={Genres} />
        <Route path="/welcome" component={WelcomeView} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
