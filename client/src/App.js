import React, { Component } from 'react';
import PostList from './components/PostList.js';
import Navbar from './components/Navbar.js';
import './Assets/css/styles.min.css';
import { Provider } from 'react-redux';
import store from './store';


class App extends Component {

  render(){
    return ( 
        <div className="app">
          <Navbar />
          <Provider store={store}>    
            <PostList  />
          </Provider>
        </div>

    );
  }

}


export default App;
