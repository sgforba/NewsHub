import React, { Component } from 'react';


class PostList extends Component {

    render() {
        
        let posts;
        if(this.props.posts){
            posts = this.props.posts.map(post => {
                console.log(post);
            })
        }

        return(
            <section>
                <div className="post-wrapper">
                </div>
            </section>
        );
    }
}

export default PostList;