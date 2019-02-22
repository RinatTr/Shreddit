import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './css/App.css';

import PostsContainer from './components/Posts/PostsContainer'
import Navbar from './components/Navbar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/all" component={PostsContainer} />
          <Route path="/popular" component={PostsContainer} />
        </Switch>
    </div>
    );
  }
}

export default App;
