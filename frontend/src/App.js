import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './css/App.css';

import PostsContainer from './components/Posts/PostsContainer'
import AuthContainer from './components/Auth/AuthContainer'
import NavbarContainer from './components/Navbar/NavbarContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavbarContainer />
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
