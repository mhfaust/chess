import { ChessGame } from 'logic/game/gameState';
import { Player } from 'logic/types/Player';
import boardCursor from './boardCursor';

const players = ['White', 'Black'] as const;

const currentPlayer = (game: ChessGame): Player => {

  const ord = boardCursor(game) % 2;
  return players[ord]; 
};

export default currentPlayer;