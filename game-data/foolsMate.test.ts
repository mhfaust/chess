import { boards } from 'logic/game/selectors/boards';
import { foolsMate } from './foolsMate';

describe('Historical Games', () => {

  it('foolsMate is valid', () => {
    
    expect(() => boards({ gamePlay: foolsMate })).not.toThrow();

  })

})