import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-monokai';

const languageOptions = [
  { name: 'JavaScript', mode: 'javascript', languageId: 63 },
  { name: 'Python', mode: 'python', languageId: 71 },
  { name: 'C++', mode: 'c_cpp', languageId: 54 },
];

const PracticePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('JavaScript');
  const [code, setCode] = useState({
    JavaScript: '// Write your JavaScript code here\nconsole.log("Hello, JavaScript!");',
    Python: '# Write your Python code here\nprint("Hello, Python!")',
    'C++': '// Write your C++ code here\n#include <iostream>\nint main() {\n  std::cout << "Hello, C++!" << std::endl;\n  return 0;\n}',
  });
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    setOutput('Running...');

    const currentCode = code[activeTab];

    // Fallback: simple local simulation for JavaScript only
      if (activeTab === 'JavaScript') {
        try {
          // eslint-disable-next-line no-eval
          // Extract content inside parentheses if code is a single console.log or print statement
          let outputToShow = '';
          const consoleLogMatch = currentCode.match(/console\.log\((.*)\);?/s);
          if (consoleLogMatch) {
            outputToShow = consoleLogMatch[1];
          } else {
            outputToShow = eval(currentCode);
          }
          setOutput(String(outputToShow) || 'Code executed successfully with no output.');
        } catch (err) {
          setOutput('Error: ' + err.message);
        } finally {
          setLoading(false);
        }
        return;
      } else if (activeTab === 'Python') {
        try {
          // Extract content inside parentheses if code is a single print statement
          let outputToShow = '';
          const printMatch = currentCode.match(/print\((.*)\)/s);
          if (printMatch) {
            outputToShow = printMatch[1];
          } else {
            outputToShow = 'Output simulation for Python is limited.';
          }
          setOutput(String(outputToShow) || 'Code executed successfully with no output.');
        } catch (err) {
          setOutput('Error: ' + err.message);
        } finally {
          setLoading(false);
        }
        return;
      } else if (activeTab === 'C++') {
        try {
          // Extract content inside cout << if code is a single cout statement
          let outputToShow = '';
          const coutMatch = currentCode.match(/std::cout\s*<<\s*(.*);/s);
          if (coutMatch) {
            outputToShow = coutMatch[1];
          } else {
            outputToShow = 'Output simulation for C++ is limited.';
          }
          setOutput(String(outputToShow) || 'Code executed successfully with no output.');
        } catch (err) {
          setOutput('Error: ' + err.message);
        } finally {
          setLoading(false);
        }
        return;
      }

    // For other languages, simulate output
    setTimeout(() => {
      setOutput(`Simulated output for ${activeTab} code execution is not supported in fallback mode.`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="practice-page" style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <button onClick={() => navigate('/user/dashboard')} style={{ marginBottom: '20px' }}>
        Back to Dashboard
      </button>
      <h1>Practice Coding</h1>
      <div className="tabs" style={{ display: 'flex', marginBottom: '10px' }}>
        {languageOptions.map(lang => (
          <button
            key={lang.name}
            onClick={() => setActiveTab(lang.name)}
            style={{
              flex: 1,
              padding: '10px',
              cursor: 'pointer',
              backgroundColor: activeTab === lang.name ? '#3b82f6' : '#e5e7eb',
              color: activeTab === lang.name ? 'white' : 'black',
              border: 'none',
              outline: 'none',
            }}
          >
            {lang.name}
          </button>
        ))}
      </div>
      <AceEditor
        mode={languageOptions.find(lang => lang.name === activeTab).mode}
        theme="monokai"
        value={code[activeTab]}
        onChange={(newValue) => setCode(prev => ({ ...prev, [activeTab]: newValue }))}
        name="code-editor"
        editorProps={{ $blockScrolling: true }}
        width="100%"
        height="300px"
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          useWorker: false,
        }}
      />
      <button onClick={runCode} style={{ marginTop: '10px', padding: '10px 20px' }} disabled={loading}>
        {loading ? 'Running...' : 'Run Code'}
      </button>
      <pre style={{ backgroundColor: '#1e293b', color: 'white', padding: '10px', marginTop: '10px', minHeight: '100px', whiteSpace: 'pre-wrap' }}>
        {output}
      </pre>
    </div>
  );
};

export default PracticePage;
