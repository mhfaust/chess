import { GameState } from "logic/game/gameState";
import { useContext } from "react";
import { GameContext } from "./GameContainer";
import { useStore } from 'zustand';


export function useGameStore<T>(
  selector: (state: GameState) => T,
  equalityFn?: (left: T, right: T) => boolean
) {
  const gameStore = useContext(GameContext);
  if(!gameStore){
    throw Error("Missing GameContext.Provider in component sub-tree");
  }
  return useStore(gameStore, selector, equalityFn);
}