import COORDS from 'logic/squares/coordinates';
import { Square } from 'logic/squares/square';

function file (position: Square): number {
    return COORDS[position][0];
};

export default file;