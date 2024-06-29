// src/App.js
import React from 'react';
import CodeEditor from './components/CodeEditor';
import Code from './components/Code';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple Code Editor</h1>
        <CodeEditor />
        {/* <Code/> */}
      </header>
    </div>
  );
}

export default App;
