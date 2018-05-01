import React, { Component } from 'react';


class NavButton extends Component {
         
    render() {
        return (
         <a href="#" className="button" onClick={this.props.hideCategories} data-id={`${this.props.outlet}`}>{this.props.outlet}</a>  
        );
      }
}

export default NavButton;