import React, { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "../styles.css";  // Make sure to include your styles

export default function Code() {
  const language = 'javascript';
  const [code, setCode] = useState(
    `function helloWorld() {\n  console.log("Hello, world!");\n}`
  );
  
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  
  return (
    <div className="Code">
      <pre>
        <code className={`language-${language} editable`} contentEditable onChange={(e) => {setCode(e.target.value)}}>{code}</code>
      </pre>
    </div>
  );
}
