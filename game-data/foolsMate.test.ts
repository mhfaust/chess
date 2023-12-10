import { positions } from 'logic/game/selectors/positions';
import { foolsMate } from './foolsMate';

describe('Historical Games', () => {
	it('foolsMate is valid', () => {
		expect(() => positions({ gamePlay: foolsMate })).not.toThrow();
	});
});
