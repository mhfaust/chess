import { GameState } from "../gameState";

export type Action = (partialStore: GameState) => Partial<GameState>;