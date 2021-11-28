import { v4 as uuidv4 } from 'uuid';

function randomId(prefix:string):string{
    return  prefix + '_' + Math.random().toString(36).substr(2, 9);
}

function randomUUID(prefix:string):string{
    return prefix + '_' + uuidv4();
}

export {randomId};