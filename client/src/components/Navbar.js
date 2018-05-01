import React, { Component } from 'react';
import NavButton from './NavButton.js';


class Navbar extends Component {    

    render() {
        let buttons;
        if(this.props.outlets){
          buttons = this.props.outlets.map(outlet => {
            return (
              <NavButton outlet={outlet} hideCategories={this.props.hideCategories} />
            );
          });
        }        
        return (
          <nav>
            <div className="category-buttons">
              {buttons}
            </div>
          </nav>
        );
      }
}

export default Navbar;