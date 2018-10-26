import React, { Component } from 'react';
import AppNavbar from './components/AppNavBar';
import AppCard from './components/AppCard';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar/>
        <AppCard/>
      </div>
    );
  }
}

export default App;
