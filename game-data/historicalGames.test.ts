import { boards } from 'logic/game/selectors/boards';
import { KasparovVeselin } from './historicalGames';

describe('Historical Games', () => {

  it('KasparovVeselin is valid', () => {
    
    expect(() => boards({ gamePlay: KasparovVeselin })).not.toThrow();

  })

})