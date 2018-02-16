import React, { Component } from 'react';
import PostList from './components/PostList.js';
import logo from './logo.svg';
import './App.css';


class App extends Component {

  super();
  state = {posts: []}

  componentDidMount() {
    this.getPosts();

  }

  getPosts = () => {
    fetch('/api/cnn')
      .then(res => res.json())
      .then(posts => this.setState({ posts }));
  }
  render(){
    return (
      <div className="App">
        <PostList posts={this.state.posts} />
      </div>
    );
  }
  // render() {
  //   return (
  //     <div className="App">
  //       <h1>Fox Articles</h1>
  //       <ul>
  //       {this.state.posts.map(post =>
  //         <li key={post._id}>
  //           <a href={post.url} target="_blank">{post.title}</a>
  //         </li> 
  //       )}
  //       </ul>
  //     </div>
  //   );
  // }

}

export default App;
