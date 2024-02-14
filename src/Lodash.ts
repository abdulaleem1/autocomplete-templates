import _ from 'lodash';
import { DropdownItem } from './components/Dropdown';

export const getAllLodashFunctions = () : DropdownItem[] => {
    return Object.entries(_).filter(i => typeof i[1] === 'function').map(item => { return { label: item[0], value: item[0] }} );
}