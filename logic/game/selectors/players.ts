import { GamePlayAndCursor } from 'logic/game/gameState';
import { Player } from 'logic/types/Player';
import { boardCursor } from 'logic/game/selectors/boards';

const players = ['White', 'Black'] as const;

const currentPlayer = (game: GamePlayAndCursor): Player => {

  const ord = boardCursor(game) % 2;
  return players[ord]; 
};

export default currentPlayer;