import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './css/App.css';

import PostsContainer from './components/Posts/PostsContainer'
import AuthContainer from './components/Auth/AuthContainer'
import Navbar from './components/Navbar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/all" component={PostsContainer} />
          <Route path="/popular" component={PostsContainer} />
          <Route path="/post/:id" component={PostsContainer} />
          <Route path="/auth/login" component={AuthContainer} />
          <Route path="/auth/signup" component={AuthContainer} />
        </Switch>
    </div>
    );
  }
}

export default App;
