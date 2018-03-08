import React, { Component } from 'react';


class Post extends Component {
    
    render() {
        const thumbStyle = {
            display: 'block',
            background: `url(${this.props.post.image})`
          };           
        return(
            <div className={`post ${ this.props.post.source }`}>
                <div className="thumb-wrapper">
                    <a className="thumbnail" style={thumbStyle}></a>
                    <a href={this.props.post.url} className="cta-link" target="_blank">Read More</a>
                </div>
                <div className="date">{this.props.post.date}</div>
                <span className={`icon icon-${ this.props.post.source }`}>{ this.props.post.source }</span>
                <a href={this.props.post.url} target="_blank" className="title">{this.props.post.title}</a>
                 <p className="content-wrapper">
                 {this.props.post.content}
                 </p>      
            </div>
        );        
    }
}

export default Post;