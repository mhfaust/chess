import { Piece } from "logic/squares/piece";
import { Square } from "logic/squares/square";
import { moveHash } from 'logic/board/move';
import { GameState } from "../gameState";

export type MoveParams = Parameters<typeof move>;

const move = (
  from: Square, 
  to: Square, 
  promoteTo: Piece | undefined
) => (gameView: Pick<GameState, 'gamePlay' |  'boardCursor'>) => {

  const newHash = moveHash([from, to, promoteTo]);
  
  const { gamePlay, boardCursor } = gameView;
  return {
    gamePlay: gamePlay ? gamePlay + ',' + newHash : newHash,
    boardCursor: boardCursor + 1
  };
};

export default move;