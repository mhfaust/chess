import COORDS from 'logic/squares/coordinates';
import { Square } from 'logic/squares/square';

function rank (square: Square): number {
    
    return COORDS[square][1];
}

export default rank;