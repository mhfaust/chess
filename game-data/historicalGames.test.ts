import { positions } from 'logic/game/selectors/positions';
import { KasparovVeselin } from './historicalGames';

describe('Historical Games', () => {

  it('KasparovVeselin is valid', () => {
    
    expect(() => positions({ gamePlay: KasparovVeselin })).not.toThrow();

  })

})