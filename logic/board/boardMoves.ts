import { Square } from 'logic/squares/square'
import { Board } from 'logic/types/Board'

const cache = new Map<Board, ([Square, Square] | null)>;

/**
 * Gets the move that resulted in the board at index
 * @param boards array of boards
 * @param index index of board for which move is desired
 * @returns [from, to]
 */
const boardMove = (boards: Board[], index?: number) => {

  if(!boards.length){
    throw Error('No boards provided to find castling preclusions.');
  }

  const i = index === undefined ? boards.length -1 : index;

  const referenceBoard = boards[i];

  const cached = cache.get(referenceBoard)
  if (cached) {
    return cached;
  }

  if(i === 0){
    cache.set(referenceBoard, null);
    return null;
  }

  const prevBoard = boards[i - 1];

  
}

export default boardMove;