import { isCheckmate } from "logic/check";
import { GameAndCursor } from "../gameState";
import { boards } from "./boards";
import { moves } from "./moves";
import currentPlayer from "./players";

export const isViewingLatestMove = (game: GameAndCursor) => {
  return game.boardCursor === boards(game).length;
}

export const isGameComplete = (game: GameAndCursor) => {
  const gameMoves = moves(game);
  if(!gameMoves || gameMoves.length < 4){
    return false;
  }
  const lastMove = [...moves(game)].pop();
  if (lastMove === 'RESIGN'){
    return true;
  }
  const gameBoards = boards(game);
  const lastBoard = [...gameBoards].pop()!;
  const player = currentPlayer(game);
  return isCheckmate(lastBoard, player);
}

export const gamePlayAt = (gamePlay: string, i: number) => {
  return gamePlay.split(',').slice(0, i).join(',');
}

export const currentGamePlay = (game: GameAndCursor) => {
  return gamePlayAt(game.gamePlay, game.boardCursor);
}