import { GameState } from 'logic/game/gameState';
import { useContext } from 'react';
import { useStore } from 'zustand';
import { gameContext } from './gameContext';

export function useGameStore<T>(
	selector: (state: GameState) => T,
	equalityFn?: (left: T, right: T) => boolean,
) {
	const gameStore = useContext(gameContext);
	if (!gameStore) {
		throw Error('Missing GameContext.Provider in component sub-tree');
	}
	return useStore(gameStore, selector, equalityFn);
}
