import { boards } from 'logic/game/selectors/boards';
import { currentGameView } from 'logic/game/selectors/currentGameView';
import textRender from 'logic/board/textRender';
import { KasparovVeselin } from './historicalGames';

describe('Historical Games', () => {

  it('KasparovVeselin is valid', () => {
    
    expect(() => boards({ gamePlay: KasparovVeselin })).not.toThrow();

    const {
      board,
      latestMove,
      enPassantSquare,
      blackCaptures,
      whiteCaptures,
    } = currentGameView({ gamePlay: KasparovVeselin, boardCursor: 87 });

    // console.log(textRender(board))
    // console.log(latestMove);
    // console.log(enPassantSquare);
    // console.log(blackCaptures);
    // console.log(whiteCaptures);
  })

})