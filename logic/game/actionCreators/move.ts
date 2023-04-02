import { Piece } from "logic/squares/piece";
import { Square } from "logic/squares/square";
import { Action } from "./Action";
import { moveHash } from 'logic/board/move';

const move = (
  from: Square, 
  to: Square, 
  promoteTo: Piece | undefined
): Action => (gameView) => {

  const newHash = moveHash([from, to, promoteTo]);
  
  const { gamePlay, boardCursor } = gameView;
  return {
    gamePlay: gamePlay ? gamePlay + ',' + newHash : newHash,
    boardCursor: boardCursor + 1
  };
};

export default move;