import { rank, file }  from 'logic/positions'
import { Square } from 'logic/positions/square';

const isOnBoard = (position: Square) => {
    if (!position) {
        return false;
    }
    return file(position) > -1 
        && file(position) < 8 
        && rank(position) > -1 
        && rank(position) < 8;
}

export default isOnBoard;