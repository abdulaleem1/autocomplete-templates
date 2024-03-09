import _ from 'lodash';

export interface LodashMap{
    [key:string]:Function;
}
export const getAllLodashFunctions = () : string[] =>Object.entries(_)
    .filter(i => typeof i[1] === "function")
    .map(i=>i[0]); 
