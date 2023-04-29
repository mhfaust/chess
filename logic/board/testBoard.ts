import { Position, PositionFile }  from 'logic/types/Position';
import { shorthand } from 'logic/squares/pieces-shorthand';

const files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

const pieceLine = (row: PositionFile, i: number) => {
    return `/*  ${files[i]}  */ [${row.map(shorthand).join(',')}],`
};


function testBoard(position: Position){
    const pieceLines = position
        .map(pieceLine)
        .join('\n');

    return `\n${pieceLines}`
}

export default testBoard;