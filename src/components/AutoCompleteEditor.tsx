import React, { useState } from 'react'
import { getAllLodashFunctions } from '../Lodash';
import _ from 'lodash';
const AutoCompleteEditor = () => {
    const [codeTarget,setCodeTarget] = useState<string>('');
    const [code, setCode] = useState<string>('');
    const lodashFunctions:string[] = getAllLodashFunctions();
    console.log(lodashFunctions);

    function onEdit(event: React.KeyboardEvent<HTMLSpanElement>) {

        //if(isNaN(Number(event.code))) return;
        if(event.key === 'Backspace'){
            setCode((prevState: string) => prevState.substring(0,prevState.length-1));
            return;
        }

        if((event.key === "Enter" || event.key === "Tab") && codeTarget != ''){
            setCode(prevState => prevState + codeTarget);
            setCodeTarget('');
        }

        if(event.key.length > 1) return;

        const parts = code.split('.');
        if(parts && parts?.length > 0){
            const functionToSearch = parts[parts.length - 1].split('(')[0];

            const firstMatch = lodashFunctions.find(i => i.includes(functionToSearch));
            if(!firstMatch) {
                setCodeTarget('');
                return;
            }
            let functionText: string = (_ as any)[firstMatch].toString();
            functionText = functionText.substring(functionText.indexOf(firstMatch) + code.length + 1, functionText.indexOf('{'));
            setCodeTarget(functionText);
        }

        setCode((prevState: string) => prevState + event.key);
    }

    return (
        <div className="flex-grow table w-1/2 relative text-2xl h-full bg-slate-700 rounded-md" tabIndex={0} onKeyDown={($event) => onEdit($event)}>
            <pre>
                <code>
                    <span className='top-0 text-white'>{code}</span>
                    <span className="text-gray-500 skeleton-code">{codeTarget}</span>
                </code>
            </pre>
        </div>
    )
}

export default AutoCompleteEditor

