import { Board, BoardFile }  from 'logic/types/Board';
import { shorthand } from 'logic/positions/pieces-shorthand';

const files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

const pieceLine = (row: BoardFile, i: number) => {
    return `/*  ${files[i]}  */ [${row.map(shorthand).join(',')}],`
};


function testBoard(board: Board){
    const pieceLines = board
        .map(pieceLine)
        .join('\n');

    return `\n${pieceLines}`
}

export default testBoard;