import { useState, useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { php } from "@codemirror/lang-php";
import { rust } from "@codemirror/lang-rust";
import { cpp } from "@codemirror/lang-cpp";
import { go } from "@codemirror/lang-go";

import { FaJs, FaPython, FaPhp, FaRust, FaSwift, FaCuttlefish, FaCode, FaSun, FaMoon } from "react-icons/fa";

const CodeEditor = () => {
  const [language, setLanguage] = useState("javascript");
  const [outputWidth, setOutputWidth] = useState(400);
  const [output, setOutput] = useState("Code Execution Successful!");
  const [theme, setTheme] = useState("light");

  const editorRef = useRef<EditorView | null>(null);

  const languageExtensions = {
    javascript: javascript(),
    python: python(),
    php: php(),
    rust: rust(),
    "c++": cpp(),
    go: go(),
  };

  const languageIcons = {
    javascript: <FaJs className="text-yellow-400 text-2xl" />,
    python: <FaPython className="text-blue-500 text-2xl" />,
    php: <FaPhp className="text-indigo-500 text-2xl" />,
    rust: <FaRust className="text-orange-500 text-2xl" />,
    swift: <FaSwift className="text-red-500 text-2xl" />,
    "c++": <FaCuttlefish className="text-purple-500 text-2xl" />,
    go: <FaCode className="text-cyan-500 text-2xl" />,
  };

  // Set up the editor instance
  useEffect(() => {
    const newEditor = new EditorView({
      state: EditorState.create({
        doc: `// Write your ${language} code here...`,
        extensions: [basicSetup, languageExtensions[language]],
      }),
      parent: document.getElementById("editor")!,
    });

    editorRef.current = newEditor;

    return () => {
      newEditor.destroy();
    };
  }, [language, languageExtensions]); // Included languageExtensions in the dependency array

  // Simulate output based on code
  const simulateOutput = () => {
    if (!editorRef.current) return;

    // Placeholder logic for output
    setOutput("Code Execution Successful!");
  };

  // Resize output panel
  const handleOutputResize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOutputWidth(parseInt(e.target.value, 10));
  };

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`flex h-screen ${theme === "dark" ? "bg-black" : "bg-gray-100"}`}>
      {/* Sidebar for language selection */}
      <div className="w-20 bg-gray-900 text-white flex flex-col items-center py-4">
        {Object.keys(languageIcons).map((lang) => (
          <button
            key={lang}
            className={`p-4 hover:bg-gray-700 rounded-lg mb-2 ${lang === language ? "bg-gray-700" : ""}`}
            onClick={() => setLanguage(lang)}
          >
            {languageIcons[lang]}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Code editor */}
        <div className="flex-1 p-4 border-r border-gray-300">
          <div id="editor" className="h-full" />
        </div>

        {/* Output panel */}
        <div
          className="bg-gray-200 text-black p-4 flex-shrink-0"
          style={{ width: `${outputWidth}px`, height: "100%", overflow: "auto" }}
        >
          <strong>Output:</strong>
          <p>{output}</p>
        </div>
      </div>

      {/* Output resize control */}
      <div className="flex justify-center p-2">
        <input
          type="range"
          min="300"
          max="600"
          value={outputWidth}
          onChange={handleOutputResize}
          className="w-3/4"
        />
      </div>

      {/* Run and Clear Buttons */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          className={`p-2 border-2 border-white ${theme === "dark" ? "text-white" : "text-black"} rounded hover:bg-gray-600`}
          onClick={simulateOutput}
        >
          Run
        </button>
        <button
          className={`p-2 border-2 border-white ${theme === "dark" ? "text-white" : "text-black"} rounded hover:bg-gray-600`}
          onClick={() => setOutput("Output cleared!")}
        >
          Clear
        </button>
        <button
          className="p-4 mt-auto mb-2 hover:bg-gray-700 rounded-full"
          onClick={toggleTheme}
        >
          {theme === "dark" ? <FaSun className="text-white text-2xl" /> : <FaMoon className="text-white text-2xl" />}
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;
