import React from 'react';
import './App.css'; // Assuming you have a CSS file for App styling
import CodeEditor from './components/CodeEditor';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{color : "white"}} >Simple Code Editor</h1>
        <CodeEditor />
      </header>
    </div>
  );
}

export default App;
