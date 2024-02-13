import { useState, useRef } from "react";
import "./App.css";

function App() {
  const editor = useRef(null);
  const [filerText, setFilerText] = useState("Type your expression here...");
  const contentChanged = () => {
    console.log("content editer");
    setFilerText("");
  };

  return (
    <>
      <div className="table w-1/2 relative text-2xl">
        <span className="opacity-50 absolute left-0 top-0 w-full">
          {filerText}
        </span>
        <div
          className="table-cell align-middle text-center  outline-0 absolute w-full"
          contentEditable="true"
          ref={editor}
          onInput={() => contentChanged()}
        ></div>
      </div>
    </>
  );
}

export default App;
