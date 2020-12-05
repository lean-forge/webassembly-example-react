import React from 'react';
import logo from './logo.svg';
import './App.css';
import Add from './components/Add';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Add />
      </header>
    </div>
  );
}

export default App;
