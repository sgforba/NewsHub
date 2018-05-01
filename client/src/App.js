import React, { Component } from 'react';
import Header from './components/Header.js';
import PostList from './components/PostList.js';
import './Assets/css/styles.min.css';
import { Provider } from 'react-redux';
import store from './store';


class App extends Component {

  render(){
    return ( 
        <div className="app">
          <Header />
          <Provider store={store}>  
            <PostList  />
          </Provider>
        </div>

    );
  }

}


export default App;
