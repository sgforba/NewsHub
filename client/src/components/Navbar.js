import React, { Component } from 'react';
import NavButton from './NavButton.js';


class Navbar extends Component {    
    render() {
        let buttons;
        if(this.props.outlets){
          buttons = this.props.outlets.map(outlet => {
            return (
              <NavButton outlet={outlet}  key={outlet.id} />
            );
          });
        }        
        return (
            <div className="header">
                <h1>NewzSpace</h1>
                <nav>
                    {buttons}
                </nav>                
            </div>
        );
      }
}

export default Navbar;