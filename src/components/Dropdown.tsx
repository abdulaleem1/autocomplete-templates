import _ from 'lodash';
import React, { useRef } from 'react';
import { DropdownItem } from "./DropdownItem";

interface DropdownProps{
    list: DropdownItem[];
    searchText: string | null | undefined;
}
export const Dropdown = ({ list, searchText }: DropdownProps) => {
   const ddRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null); 

    const keyUp = ($event: React.KeyboardEvent<HTMLDivElement>) => {
        if($event.code === "ArrowDown"){
            alert($event.code)
        }
    }
  return (
    <div className='border border-solid' ref={ddRef} onKeyUp={($event) => keyUp($event)}>
        {_.chain(list)
            .filter(item => searchText ? item.label.startsWith(searchText): false)
            .slice(0, 5)
            .map(item => 
                <div key={item.value}>{item.label}</div> 
            )
            .value()}
    </div>
  )
}
