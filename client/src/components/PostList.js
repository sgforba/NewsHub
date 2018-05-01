import React, { Component } from 'react';
import Post from './Post.js';
import Navbar from './Navbar.js';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postAction';

class PostList extends Component {
    componentDidMount() {
      this.props.fetchPosts();

    }
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
            <div className="content-wrapper">     
              <Navbar outlets={this.props.outlets} hideCategories={this.hideCategories} />
              <div className="projects">
                {posts}
              </div>      
            </div>
        );
      }
}

const mapStateToProps = state => ({
  posts: state.posts.posts
});

export default connect(mapStateToProps, { fetchPosts })(PostList);