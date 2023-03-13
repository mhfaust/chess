export const knightVectors = Object.freeze([
            [-1,-2],[1,-2],
    [-2,-1],               [2,-1],
    [-2, 1],               [2, 1],
            [-1, 2],[1, 2]
]);

export const bishopVectors = Object.freeze([
        [ 1, 1], [ 1,-1], 
        [-1,-1], [-1, 1]
]);

export const rookVectors = Object.freeze([
             [0,  1],
    [ 0,-1],          [1,0], 
             [-1, 0]
]);

export const queenVectors = Object.freeze([
    ...rookVectors, 
    ...bishopVectors
]);

export const kingVectors = Object.freeze([
    ...queenVectors
]);

export const pawnWhiteAttackVectors = Object.freeze([
    [-1, 1],       [1, 1]
]);

export const pawnBlackAttackVectors = Object.freeze([
    [-1,-1],       [1,-1]
]);

export const pawnWhiteAdvanceVectors = Object.freeze([
    [0, 1],
]);

export const pawnBlackAdvanceVectors = Object.freeze([
    [0,-1],
]);
