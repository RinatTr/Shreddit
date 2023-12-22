import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './css/App.css';

import PostsContainer from './components/Posts/PostsContainer.js'
import CreatePostContainer from "./components/Posts/CreatePost/CreatePostContainer.js";
import UserContainer from './components/User/UserContainer.js'
import SubContainer from './components/Subshreddit/SubContainer.js'
import AuthContainer from './components/Auth/AuthContainer.js'
import NavbarContainer from './components/Navbar/NavbarContainer.js'

function App () {
    return (
      <div className="App">
        <Route component={NavbarContainer} />
        <Switch>
          <Route exact path="/" component={PostsContainer} />
          <Route path="/all" component={PostsContainer} />
          <Route path="/popular" component={PostsContainer} />
          <Route path="/user/:username" component={UserContainer} />
          <Route path="/subshreddit/:subId" component={SubContainer} />
          <Route path="/post/:id" component={PostsContainer} />
          <Route path="/submit" component={CreatePostContainer} />
          <Route path="/auth/login" component={AuthContainer} />
          <Route path="/auth/signup" component={AuthContainer} />
        </Switch>
    </div>
    );
}

export default App;
