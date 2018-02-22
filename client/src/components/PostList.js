import React, { Component } from 'react';
import Post from './Post.js';

class PostList extends Component {
    render() {
        let posts;
        if(this.props.posts){
          posts = this.props.posts.map(post => {
            return (
              <Post key={post.id} post={post} />
            );
          });
        }
        return (
          
          <div className="projects">
           
            {posts}
          </div>
        );
      }
}

export default PostList;