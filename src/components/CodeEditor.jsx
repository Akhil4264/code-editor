import React, { useState, useRef, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

const SyntaxHighlightingEditor = () => {
  const [text, setText] = useState('//Syntax highlighter for javascript\n\n// Enter your code');
  const [language, setLanguage] = useState('javascript');
  const textAreaRef = useRef(null);
  const highlightingRef = useRef(null);

  useEffect(() => {
    Prism.highlightAllUnder(highlightingRef.current);
  }, [text, language]);

  const handleInputChange = (event) => {
    let value = event.target.value;
    if (value[value.length - 1] === '\n') {
      value += ' ';
    }
    setText(value);
  };

  const handleScroll = () => {
    if (highlightingRef.current && textAreaRef.current) {
      highlightingRef.current.scrollTop = textAreaRef.current.scrollTop;
      highlightingRef.current.scrollLeft = textAreaRef.current.scrollLeft;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const textarea = textAreaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = text.substring(0, start) + '\t' + text.substring(end);
      setText(newValue);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }, 0);
    }
  };

  return (
    <div style={{ position: 'relative', height: 'auto', width: '600px', margin: 'auto' }}>
      <textarea
        ref={textAreaRef}
        id="editing"
        spellCheck="false"
        value={text}
        onChange={handleInputChange}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        style={textAreaStyle}
      />
      <pre id="highlighting" style={highlightingStyle} ref={highlightingRef}>
        <code className={`language-${language}`} id="highlighting-content" >
          {text}
        </code>
      </pre>
    </div>
  );
};

const textAreaStyle = {
  margin: '10px',
  padding: '10px',
  border: 0,
  borderRadius: 4,
  width: '100%',
  height: '500px',
  fontSize: '12pt',
  fontFamily: 'monospace',
  lineHeight: 1.5,
  tabSize: 4,
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1,
  background: 'transparent',
  color: 'transparent',
  caretColor: 'red',
  outline: 'none',
  resize: 'none', 
  whiteSpace: 'pre',
  overflow: 'auto',
};

const highlightingStyle = {
  backgroundColor: '#fff',
  margin: '10px',
  padding: '10px',
  border: 0,
  borderRadius: 4,
  width: '100%',
  height: '500px',
  fontFamily: 'monospace',
  lineHeight: 1.5,
  tabSize: 4,
  position: 'absolute',
  top: 0,
  left: 0,
  outline: 'none',
  zIndex: 0,
  whiteSpace: 'pre',
  overflow: 'auto',
};

export default SyntaxHighlightingEditor;
