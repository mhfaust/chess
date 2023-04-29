import { pieceSymbols }  from 'logic/constants/pieces';
import { rotateCounterClockwise }  from 'logic/position/rotate';
import chalk from 'chalk';
import { Position, PieceOrEmpty }  from 'logic/types/Position';
import { Piece }  from 'logic/squares/piece';

const { bgWhite, black, blue } = chalk;

const topLine     = '   ┌───┬───┬───┬───┬───┬───┬───┬───┐  \n';
const separLine   = '   ├───┼───┼───┼───┼───┼───┼───┼───┤  \n';
const bottomLine  = '   └───┴───┴───┴───┴───┴───┴───┴───┘  \n';
const filesLine   = '     A   B   C   D   E   F   G   H    \n';

const pieceLine = (row: PieceOrEmpty[], i: number) => {
    const drawPiece = (p: PieceOrEmpty) => {
        return blue(pieceSymbols[p as Piece] ?? ' ')
    };
    return ` ${7-i+1} │ ${row.map(drawPiece).join(' │ ')} │  \n`
};


function asciiBoard(position: Position){
    const pieceLines = rotateCounterClockwise<PieceOrEmpty>(position as any)
        .map(pieceLine)
        .join(separLine);

    return bgWhite(black(
        `\n${topLine}${pieceLines}${bottomLine}${filesLine}`
    ));
}

export default asciiBoard;