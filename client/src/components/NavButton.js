import React, { Component } from 'react';


class NavButton extends Component {
         
    render() {
        return (
         <button>{this.props.outlet.name}</button>  
        );
      }
}

export default NavButton;