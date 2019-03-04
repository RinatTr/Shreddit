import React, { Component } from 'react';

export default class User extends Component {
  constructor() {
    super()

  }

  componentDidMount() {
    this.props.fetchUserPosts(4)
  }
  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <h1>REMOVE AFTER CSS</h1>
        <h1>ima user yo, yo. yo, yo.</h1>
      </React.Fragment>
    )
  }
}
