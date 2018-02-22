import React, { Component } from 'react';


class Post extends Component {
    
    render() {
        const thumbStyle = {
            display: 'block',
            background: `url(${this.props.post.image})`
          };           
        return(
            <div className={`post ${ this.props.post.source }`}>
                <a className="thumbnail" style={thumbStyle}></a>
                <a href={this.props.post.url} target="_blank" className="title">{this.props.post.title}</a>
                 <p className="content-wrapper">
                 <span className={`icon-${ this.props.post.source }`}></span>
                 {this.props.post.content}
                 </p>
                 <p>
                     <a href={this.props.post.url} className="cta-link">Read More..</a>
                 </p>        
            </div>
        );        
    }
}

export default Post;