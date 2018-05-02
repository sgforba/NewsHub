import React, { Component } from 'react';


class NavButton extends Component {
         
    render() {
        return (
         <button href="#" className={`button down button-${this.props.outlet}`} onClick={() => {this.props.hideCategories(this.props.outlet)}} data-id={`${this.props.outlet}`}>{this.props.outlet}</button>  
        );
      }
}

export default NavButton;