import { unicodeSymbols }  from 'logic/constants/pieces';
import { rotateCounterClockwise }  from 'logic/board/rotate';
import chalk from 'chalk';
import { Board, PieceOrEmpty }  from 'logic/types/Board';
import { Piece }  from 'logic/squares/piece';

const { bgWhite, black, blue } = chalk;

const topLine     = '   ┌───┬───┬───┬───┬───┬───┬───┬───┐  \n';
const separLine   = '   ├───┼───┼───┼───┼───┼───┼───┼───┤  \n';
const bottomLine  = '   └───┴───┴───┴───┴───┴───┴───┴───┘  \n';
const filesLine   = '     A   B   C   D   E   F   G   H    \n';

const pieceLine = (row: PieceOrEmpty[], i: number) => {
    const drawPiece = (p: PieceOrEmpty) => {
        return blue(unicodeSymbols[p as Piece] ?? ' ')
    };
    return ` ${7-i+1} │ ${row.map(drawPiece).join(' │ ')} │  \n`
};


function asciiBoard(board: Board){
    const pieceLines = rotateCounterClockwise(board)
        .map(pieceLine)
        .join(separLine);

    return bgWhite(black(
        `\n${topLine}${pieceLines}${bottomLine}${filesLine}`
    ));
}

export default asciiBoard;