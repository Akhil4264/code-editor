import React, { useState, useRef, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'; // Include Prism CSS for styling

const SyntaxHighlightingEditor = () => {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('javascript'); // Default language
  const textAreaRef = useRef(null);
  const highlightingRef = useRef(null);

  useEffect(() => {
    // Syntax highlight the code
    Prism.highlightElement(highlightingRef.current);
  }, [text, language]);

  const handleInputChange = (event) => {
    let value = event.target.value;
    // Handle final newlines
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
      event.preventDefault(); // stop normal tab behavior
      const textarea = textAreaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = text.substring(0, start) + '\t' + text.substring(end);
      setText(newValue);
      // Move cursor
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }, 0);
    }
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div style={{ position: 'relative', height: 'auto', width: '600px' }}>
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
      <pre id="highlighting" style={highlightingStyle}>
        <code ref={highlightingRef} className={`language-${language}`} id="highlighting-content">
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
  width: '100%',
  height: '300px', // Set fixed height
  fontSize: '12pt',
  fontFamily: 'monospace',
  lineHeight: 1.5,
  tabSize: 4,
  position: 'absolute',
  top: 0,
  left: 0,
  background: 'transparent',
  color: 'transparent',
  caretColor: 'red', // Change cursor color to red
  whiteSpace: 'pre-wrap',
  overflowWrap: 'break-word',
  overflow: 'auto', // Enable auto-scrolling
  zIndex: 1,
  outline: 'none',
  resize: 'none', // Disable manual resizing
};

const highlightingStyle = {
  margin: '10px',
  padding: '10px',
  border: 0,
  width: '100%',
  height: '300px', // Set fixed height
  position: 'absolute',
  top: 0,
  left: 0,
  pointerEvents: 'none',
  whiteSpace: 'pre-wrap',
  overflowWrap: 'break-word',
  overflow: 'auto',
  outline:'none',
  zIndex: 0,
};

export default SyntaxHighlightingEditor;
