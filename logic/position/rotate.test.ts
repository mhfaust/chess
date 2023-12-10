import { rotate180, rotateClockwise, rotateCounterClockwise } from './rotate';
describe('rotateCounterClockwise', () => {
	it('rotates a 2x2 grid counter-clockwise', () => {
		const grid = [
			['a', 'b'],
			['c', 'd'],
		];
		const rotated = rotateCounterClockwise(grid);
		expect(rotated).toStrictEqual([
			['b', 'd'],
			['a', 'c'],
		]);
	});
	it('rotates a 3x3 grid counter-clockwise', () => {
		const grid = [
			['a', 'b', 'c'],
			['d', 'e', 'f'],
			['g', 'h', 'i'],
		];
		const rotated = rotateCounterClockwise(grid);
		expect(rotated).toStrictEqual([
			['c', 'f', 'i'],
			['b', 'e', 'h'],
			['a', 'd', 'g'],
		]);
	});
});
describe('rotateClockwise', () => {
	it('rotates a 2x2 grid clockwise', () => {
		const grid = [
			['a', 'b'],
			['c', 'd'],
		];
		expect(rotateClockwise(grid)).toStrictEqual([
			['c', 'a'],
			['d', 'b'],
		]);
	});
	it('rotates a 3x3 grid clockwise', () => {
		const grid = [
			['a', 'b', 'c'],
			['d', 'e', 'f'],
			['g', 'h', 'i'],
		];
		const rotated = rotateClockwise(grid);
		expect(rotated).toStrictEqual([
			['g', 'd', 'a'],
			['h', 'e', 'b'],
			['i', 'f', 'c'],
		]);
	});
});
describe('rotate180', () => {
	it('rotates a 2x2 grid 180 degrees', () => {
		const grid = [
			['a', 'b'],
			['c', 'd'],
		];
		expect(rotate180(grid)).toStrictEqual([
			['d', 'c'],
			['b', 'a'],
		]);
	});
	it('rotates a 3x3 grid 180 degrees', () => {
		const grid = [
			['a', 'b', 'c'],
			['d', 'e', 'f'],
			['g', 'h', 'i'],
		];
		const rotated = rotate180(grid);
		expect(rotated).toStrictEqual([
			['i', 'h', 'g'],
			['f', 'e', 'd'],
			['c', 'b', 'a'],
		]);
	});
});
