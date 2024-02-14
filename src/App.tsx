import { useState, useRef } from "react";
import "./App.css";
import { getAllLodashFunctions } from "./Lodash";
import { Dropdown } from "./components/Dropdown";

const PLACEHOLDER_TEXT = "Type your expression here...";

function App() {
    const editor: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
    const [filerText, setFilerText] = useState(PLACEHOLDER_TEXT);
    const functionList = useRef(getAllLodashFunctions());
    const [searchText, setSearchText] = useState<string | null | undefined>(
        null
    );

    const contentChanged = () => {
        console.log("content editer");
        setFilerText("");

        if (editor.current?.textContent === "") return;

        const pattern = /\.(\w+)\(/;
        const functionString = editor.current?.textContent!;

        // Find all matches
        const matches = functionString.match(new RegExp(pattern, "g"));

        // Get the last match (which will be the last function name)
        const lastFunctionName =
            matches && matches.length > 0
                ? matches[matches.length - 2].match(/\w+/)
                : [];

        if(lastFunctionName?.length && lastFunctionName?.length > 0)
        setSearchText(lastFunctionName[0]);
    };

    const focusOut = () => {
        if (editor.current?.textContent === "") setFilerText(PLACEHOLDER_TEXT);
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
                    onBlur={() => focusOut()}
                ></div>

                <div
                    className="absolute text-center w-full"
                    style={{ top: editor.current?.clientHeight ?? 32 }}
                >
                    <Dropdown
                        list={functionList.current}
                        searchText={searchText}
                    />
                </div>
            </div>
        </>
    );
}

export default App;
