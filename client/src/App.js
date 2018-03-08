import React, { Component } from 'react';
import PostList from './components/PostList.js';
import Navbar from './components/Navbar.js';
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
  getPosts = () => {
    fetch('/api/')
      .then(res => res.json())
      .then(posts => this.setState({ posts }));
  } 
  render(){
    return ( 
      <div className="app">
        <Navbar />
        <PostList posts={this.state.posts} />
      </div>
    );
  }

}

export default App;
