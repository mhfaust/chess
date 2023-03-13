import { boards } from "app/state/selectors/boards";
import { currentGameView } from "app/state/selectors/currentGameView";
import textRender from "rules/board/textRender";
import { KasparovVeselin } from "./historicalGames";

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

    console.log(textRender(board))
    console.log(latestMove);
    console.log(enPassantSquare);
    console.log(blackCaptures);
    console.log(whiteCaptures);
  })

})