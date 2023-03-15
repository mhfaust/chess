import { ChessGame } from 'logic/game/gameState';
import { boards } from './boards';

const boardCursor = (game: ChessGame) => {
  return game.boardCursor ?? boards(game).length - 1;
}

export default boardCursor;