import React, { Component } from 'react';
import PostList from './components/PostList.js';
// import logo from './logo.svg';
 import './Assets/css/styles.min.css';


class App extends Component {

  state = {posts: []}

  componentDidMount() {
    this.getPosts();

  }

  getPosts = () => {
    fetch('/api/')
      .then(res => res.json())
      .then(posts => this.setState({ posts }));
  }
  render(){
    return (
      <div className="app">
        <PostList posts={this.state.posts} />
      </div>
    );
  }

}

export default App;
