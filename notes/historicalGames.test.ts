import { boards } from "app/state/selectors/boards";
import { currentGameView } from "app/state/selectors/currentGameView";
import { moves } from "app/state/selectors/moves";
import { KasparovVeselin } from "./historicalGames";

describe('Historical Games', () => {

  it('KasparovVeselin is valid', () => {
    
    expect(() => boards({ gamePlay: KasparovVeselin })).not.toThrow();

    // const gameBoards = currentGameView({ gamePlay: KasparovVeselin });



    // const boards({ gamePlay: KasparovVeselin }
  })

})