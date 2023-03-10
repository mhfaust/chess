import enPassantSquare from "rules/moves/enPassantSquare";
import { GameState } from "../gameState";
import { boards, previousBoard } from "./boards";
import { moves } from "./moves";



export const epSquare = (state: GameState, i: number) => {
  if (i === 0){
    return null;
  }
  const prevBoard = boards(state)[i-1];
  const [from, to] = moves(state)[i];
  return enPassantSquare(prevBoard, from, to);
}


const currentEnPassantSquare = (state: GameState) => {
  const { boardCursor } = state;
  if(boardCursor === 0){
    return null;
  }

  return epSquare(state, boardCursor)
}

export default currentEnPassantSquare;