import React, { Component } from 'react';


class Post extends Component {

    constructor(props) {
        super (props)
        this.state = {modal: false};
        this.modalToggle = this.modalToggle.bind(this);
    }

    modalToggle() {
        this.setState({
            modal: !this.state.modal
        });
        if(!document.getElementById('main').classList.contains("modal")){
            document.getElementById('main').classList.add('modal');
        }
        else{
            document.getElementById('main').classList.remove('modal');
        }
    }

    render() {
        const thumbStyle = {
            display: 'block',
            background: `url(${this.props.post.image})`
        }  
    
        return(
            <div className={`post ${ this.props.post.source } modal-${ this.state.modal }`}>
                <div className="thumb-wrapper">
                    <a className="thumbnail" style={thumbStyle}></a>
                    <a href={this.props.post.url} className="cta-link" target="_blank">Read More</a>
                </div>
                
                <span className={`icon icon-${ this.props.post.source }`}>{ this.props.post.source }</span>
                <a href={this.props.post.url} target="_blank" className="title">{this.props.post.title}</a>
                 <p className="content-wrapper">
                    {this.props.post.content}
                 </p>  
                <div className="close-modal"onClick={this.modalToggle}>x</div>
                <div className="open-modal" onClick={this.modalToggle}>Read More..</div>
            </div>
        );        
    }
}

export default Post;