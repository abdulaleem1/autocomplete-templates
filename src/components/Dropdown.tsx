import _ from 'lodash';

export interface DropdownItem{ 
    label: string;
    value: string;
}

export interface DropdownProps{
    list: DropdownItem[];
    searchText: string | null | undefined;
}
export const Dropdown = ({ list, searchText }: DropdownProps) => {
  return (
    <div className='border border-solid'>
        {_.chain(list)
            .filter(item => searchText ? item.label.includes(searchText): false)
            .slice(0, 5)
            .map(item => 
                <div key={item.value}>{item.label}</div> 
            )
            .value()}
    </div>
  )
}
