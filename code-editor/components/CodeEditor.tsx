import { useState, useEffect, useMemo, useRef } from "react";
import { EditorView } from "@codemirror/view";
import { EditorState, Extension } from "@codemirror/state"; // Import Extension properly
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { php } from "@codemirror/lang-php";
import { rust } from "@codemirror/lang-rust";
import { cpp } from "@codemirror/lang-cpp";
import { go } from "@codemirror/lang-go";
import { FaJs, FaPython, FaPhp, FaRust, FaCuttlefish, FaCode, FaSun, FaMoon } from "react-icons/fa";

// Define the possible languages
type Language = "javascript" | "python" | "php" | "rust" | "c++" | "go";

const CodeEditor = () => {
  const [language, setLanguage] = useState<Language>("javascript");
  const [outputWidth, setOutputWidth] = useState(400);
  const [output, setOutput] = useState("Code Execution Successful!");
  const [theme, setTheme] = useState("light");

  const editorRef = useRef<EditorView | null>(null);

  // Define language extensions using a more precise type
  const languageExtensions = useMemo(() => {
    const languageExtensionsMap: Record<Language, Extension> = {
      javascript: javascript(),
      python: python(),
      php: php(),
      rust: rust(),
      "c++": cpp(),
      go: go(),
    };
    return languageExtensionsMap[language];
  }, [language]); // Memoize based on language

  const languageIcons: Record<Language, JSX.Element> = {
    javascript: <FaJs className="text-yellow-400 text-2xl" />,
    python: <FaPython className="text-blue-500 text-2xl" />,
    php: <FaPhp className="text-indigo-500 text-2xl" />,
    rust: <FaRust className="text-orange-500 text-2xl" />,
    "c++": <FaCuttlefish className="text-purple-500 text-2xl" />,
    go: <FaCode className="text-cyan-500 text-2xl" />,
  };

  useEffect(() => {
    // Create the editor with the selected language extension
    const newEditor = new EditorView({
      state: EditorState.create({
        doc: `// Write your ${language} code here...`,
        extensions: [languageExtensions],
      }),
      parent: document.getElementById("editor")!,
    });

    editorRef.current = newEditor;

    // Clean up the editor when the component is unmounted
    return () => {
      newEditor.destroy();
    };
  }, [language, languageExtensions]); // Add languageExtensions to dependencies

  const simulateOutput = () => {
    if (!editorRef.current) return;
    setOutput("Code Execution Successful!");
  };

  const handleOutputResize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOutputWidth(parseInt(e.target.value, 10));
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`flex h-screen ${theme === "dark" ? "bg-zinc-500" : "bg-gray-100"}`}>
      <div className="w-20 bg-gray-900 text-white flex flex-col items-center py-4">
        {Object.keys(languageIcons).map((lang) => (
          <button
            key={lang}
            className={`p-4 hover:bg-gray-700 rounded-lg mb-2 ${lang === language ? "bg-gray-700" : ""}`}
            onClick={() => setLanguage(lang as Language)}
          >
            {languageIcons[lang as Language]}
          </button>
        ))}
      </div>

      <div className="flex-1 flex">
        <div className="flex-1 p-4 border-r border-gray-300">
          <div id="editor" className="h-full" />
        </div>

        <div
          className="bg-gray-200 text-black p-4 flex-shrink-0"
          style={{ width: `${outputWidth}px`, height: "100%", overflow: "auto" }}
        >
          <strong>Output:</strong>
          <p>{output}</p>
        </div>
      </div>

      <div className="flex justify-center p-2">
        <input
          type="range"
          min="300"
          max="600"
          value={outputWidth}
          onChange={handleOutputResize}
          className="w-2/4"
        />
      </div>

      <div className="absolute top-3 right-4 flex gap-2">
      <div className="absolute top-3 right-4 flex flex-col gap-2">
      <button
  className={`px-4 py-0.5 border-2 border-black ${theme === "dark" ? "text-white" : "text-black"} bg-gray-500 hover:bg-gray-600 rounded-full`}
  onClick={toggleTheme}
>
  {theme === "dark" ? <FaSun className="text-white text-2xl" /> : <FaMoon className="text-black text-2xl" />}
</button>



  <button
    className={`p-2 border-2 border-black ${theme === "dark" ? "text-white" : "text-black"} rounded hover:bg-gray-600`}
    onClick={simulateOutput}
  >
    Run
  </button>

  <button
    className={`px-4 py-0.5 border-2 border-black ${theme === "dark" ? "text-white" : "text-black"} rounded hover:bg-gray-600`}
    onClick={() => setOutput("Output cleared!")}
  >
    Clear
  </button>
</div>


{/* <button
  className={`px-4 py-0.5 border-2 border-black ${theme === "dark" ? "text-white" : "text-black"} hover:bg-gray-600 rounded-full`}
  onClick={toggleTheme}
>
  {theme === "dark" ? <FaSun className="text-white text-2xl" /> : <FaMoon className="text-white text-2xl" />}
</button> */}

      </div>
    </div>
  );
};

export default CodeEditor;
