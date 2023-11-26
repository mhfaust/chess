import { Piece } from "logic/squares/piece";
import { Square } from "logic/squares/square";
import { moveHash } from 'logic/position/move';
import { GameState } from "../gameState";

export type MoveParams = Parameters<typeof move>;

const move = (
  from: Square, 
  to: Square, 
  promoteTo: Piece | undefined
) => (gameView: Pick<GameState, 'gamePlay' |  'positionCursor'>) => {

  const newHash = moveHash([from, to, promoteTo]);
  
  const { gamePlay, positionCursor } = gameView;
  return {
    gamePlay: (gamePlay && `${gamePlay},`) + newHash,
    positionCursor: positionCursor + 1
  };
};

export default move;