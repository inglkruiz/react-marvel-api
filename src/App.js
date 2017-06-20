import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Characters from './routes/characters';
import Comics from './routes/comics';

const Navigation = () => (
  <nav className="navbar navbar-default App-navbar">
    <ul className="nav navbar-nav">
      <li><Link to="/characters"><span className="h4">Characters</span></Link></li>
      <li><Link to="/comics"><span className="h4">Comics</span></Link></li>
    </ul>
  </nav>
);

const App = () => (
  <div className="App">
    <Header />
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Characters}/>
          <Route path="/characters" component={Characters}/>
          <Route path="/comics" component={Comics}/>
        </Switch>
      </div>
    </Router>
  </div>
);

export default App;
