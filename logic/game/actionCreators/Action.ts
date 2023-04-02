import { GameView } from "../gameState";

export type Action = (partialStore: GameView) => Partial<GameView>;