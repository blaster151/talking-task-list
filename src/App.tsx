import React from 'react';
import logo from './logo.svg';
import './App.css';
import TaskList from './TaskList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <div>
          <TaskList></TaskList>
        </div>
      </header>

      <div>
        <a href='https://csvjson.com/csv2json'>CSV to JSON converter</a>
      </div>
    </div>
  );
}

export default App;
