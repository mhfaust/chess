import { Square } from "logic/squares/square";
import { Action } from "./Action";

const toggleSquare = (square: Square | null): Action => {
  return ({ selectedSquare }) => {

    const nextSelectedSquare = square !== selectedSquare && square || null;
    return { selectedSquare:  nextSelectedSquare }
  }
};

export default toggleSquare;