import { useState, useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { php } from "@codemirror/lang-php";
import { rust } from "@codemirror/lang-rust";
import { cpp } from "@codemirror/lang-cpp";
import { go } from "@codemirror/lang-go";

import {
  FaJs,
  FaPython,
  FaPhp,
  FaRust,
  FaCuttlefish,
  FaCode,
  FaSun,
  FaMoon,
} from "react-icons/fa";

const CodeEditor = () => {
  const [editor, setEditor] = useState<EditorView | null>(null);
  const [language, setLanguage] = useState("javascript");
  const [outputWidth, setOutputWidth] = useState(540); // Default to 60% of the range (300-600)
  const [output, setOutput] = useState("Code Execution Successful!");
  const [theme, setTheme] = useState("light"); // light or dark theme

  const editorRef = useRef<EditorView | null>(null);

  // Define available languages with their extensions
  const languages = {
    javascript: javascript,
    python: python,
    php: php,
    rust: rust,
    "c++": cpp,
    go: go,
  };

  const languageIcons = {
    javascript: <FaJs className="text-yellow-400 text-2xl" />,
    python: <FaPython className="text-blue-500 text-2xl" />,
    php: <FaPhp className="text-indigo-500 text-2xl" />,
    rust: <FaRust className="text-orange-500 text-2xl" />,
    "c++": <FaCuttlefish className="text-purple-500 text-2xl" />,
    go: <FaCode className="text-cyan-500 text-2xl" />,
  };

  // Set up the editor instance
  useEffect(() => {
    const newEditor = new EditorView({
      state: EditorState.create({
        doc: `// Write your ${language} code here...`,
        extensions: [basicSetup, languages[language]()],
      }),
      parent: document.getElementById("editor")!,
    });

    editorRef.current = newEditor;
    setEditor(newEditor);

    return () => {
      newEditor.destroy();
    };
  }, [language]);

  // Simulate output based on code
  const simulateOutput = () => {
    if (!editorRef.current) return;

    const code = editorRef.current.state.doc.toString();

    // Placeholder logic for output (you can enhance this based on real execution)
    setOutput(`You wrote: ${code}`);
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
    <div className={`flex h-screen ${theme === "dark" ? "bg-slate-700" : "bg-gray-100"}`}>
      {/* Theme Toggle Button at the top-right corner */}
      <button
        className={`absolute top-4 right-4 p-4 hover:bg-gray-700 rounded-full z-10 ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-200"
        }`}
        onClick={toggleTheme}
      >
        {theme === "dark" ? (
          <FaSun className="text-white text-2xl" />
        ) : (
          <FaMoon className="text-black text-2xl" />
        )}
      </button>

      {/* Sidebar for language selection */}
      <div className="w-20 bg-gray-900 text-white flex flex-col items-center py-4">
        {Object.keys(languageIcons).map((lang) => (
          <button
            key={lang}
            className={`p-4 hover:bg-gray-700 rounded-lg mb-2 ${
              lang === language ? "bg-gray-700" : ""
            }`}
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
      </div>

      {/* Run and Clear Buttons */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          className={`p-2 border-2 border-white ${
            theme === "dark" ? "text-white" : "text-black"
          } rounded hover:bg-gray-600`}
          onClick={simulateOutput}
        >
          Run
        </button>
        <button
          className={`p-2 border-2 border-white ${
            theme === "dark" ? "text-white" : "text-black"
          } rounded hover:bg-gray-600`}
          onClick={() => setOutput("Output cleared!")}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;
