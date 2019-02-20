import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Home from './components/Home'
import Post from './components/Post'
import Nav from './components/Navbar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:post_id" component={Post} />
        </Switch>
    </div>
    );
  }
}

export default App;
