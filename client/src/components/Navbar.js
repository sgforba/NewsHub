import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        let posts;
        if(this.props.posts){
          posts = this.props.posts.map(post => {
          });
        }
        return (
         <div className="header" >
             NewzHub
         </div>    
        );
      }
}

export default Navbar;