import { isCheckmate } from "logic/check";
import { GamePlayAndCursor } from "../gameState";
import { positions } from "./positions";
import { moves } from "./moves";
import currentPlayer from "./players";

export const isViewingLatestPosition = (game: GamePlayAndCursor) => {
  return game.boardCursor === positions(game).length - 1;
}

export const isGameComplete = (game: GamePlayAndCursor) => {
  const gameMoves = moves(game);
  if(!gameMoves || gameMoves.length < 4){
    return false;
  }
  const lastMove = [...moves(game)].pop();
  if (lastMove === 'RESIGN'){
    return true;
  }
  const gamePositions = positions(game);
  const lastPosition = [...gamePositions].pop()!;
  const player = currentPlayer(game);
  return isCheckmate(lastPosition, player);
}

export const gamePlayAt = (gamePlay: string, i: number) => {
  return gamePlay.split(',').slice(0, i).join(',');
}

export const currentGamePlay = (game: GamePlayAndCursor) => {
  return gamePlayAt(game.gamePlay, game.boardCursor);
}