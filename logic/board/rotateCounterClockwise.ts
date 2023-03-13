import { emptyBoard }  from 'logic/board'
import { Board }  from 'logic/types/Board';

function rotateCounterClockwise(board: Board){

    const rotated: Board = emptyBoard();
    board.forEach((arr, i) => arr.forEach((piece, j) => rotated[7-j][i] = piece))
    return rotated;
}

export function rotate8by8<T>(board: T[][]){
    return [
        [...board.map(file => file[7])],
        [...board.map(file => file[6])],
        [...board.map(file => file[5])],
        [...board.map(file => file[4])],
        [...board.map(file => file[3])],
        [...board.map(file => file[2])],
        [...board.map(file => file[1])],
        [...board.map(file => file[0])],
    ];
}
    

export default rotateCounterClockwise;