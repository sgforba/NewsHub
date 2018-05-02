import React, { Component } from 'react';
import Post from './Post.js';
import Navbar from './Navbar.js';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postAction';

class PostList extends Component {
    componentDidMount() {
      this.props.fetchPosts();
    }
    hideCategories(x){
      var classesToHide = document.getElementsByClassName(x);
      var clickedButton = document.getElementsByClassName('button-'+x);

      if(clickedButton[0].classList.contains('down')) {
        clickedButton[0].classList.remove('down');
      } else {
        clickedButton[0].classList.add('down');
      }

      for (let item of classesToHide) {
        if(item.classList.contains('hidden')) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      }

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
  posts: state.posts.posts,
  outlets: state.posts.outlets
});

export default connect(mapStateToProps, { fetchPosts })(PostList);