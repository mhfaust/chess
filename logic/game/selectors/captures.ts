import { pieceAt } from 'logic/positions';
import { Piece } from 'logic/positions/piece';
import { Board } from 'logic/types/Board';
import { ChessGame } from 'logic/game/gameState';
import { boards, currentBoard } from './boards';
import { epSquare } from './enPassant';
import { moves } from './moves';

type Captures = {
  black: Piece[];
  white: Piece[]
}

const noCaptures: Captures = {
  white: [],
  black: []
};

const boardCache = new Map<Board, Captures>();

export const captures = (state: Pick<ChessGame, 'gamePlay'>) => {

  const gameBoards = boards(state);
  const gameMoves = moves(state);

  if(state.gamePlay === ''){
    return noCaptures;
  }

  return gameMoves.reduce<Captures>((acc, move, i) => {
    if (move === 'RESIGN') {
      return acc;
    }
    const [_, to] = move;
    const prevBoard = gameBoards[i];
    const nextBoard = gameBoards[i + 1]!; //todo: is this assertion OK?

    if(boardCache.has(nextBoard)){
      return boardCache.get(nextBoard)!;
    }

    const captured = pieceAt(prevBoard, to);
    const isBlacksTurn = i % 2 === 1;

    const newBlackList = [...acc.black];
    const newWhiteList = [...acc.white];

    const updatedList = isBlacksTurn ? newBlackList : newWhiteList;
    if (captured) {
      updatedList.push(captured)
    } 
    else if (to === epSquare(state, i - 1)) {
      updatedList.push(isBlacksTurn ? 'White Pawn' : 'Black Pawn');
    }
    const newCaptures = {
      black: newBlackList,
      white: newWhiteList
    };
    boardCache.set(nextBoard, newCaptures);

    return newCaptures;

  }, noCaptures);
};

export const currentCaptures = (state: ChessGame) => {
  const board = currentBoard(state);
  captures(state);// <-- just running this to generate board-cache.
  return boardCache.get(board)!;
}