import { Piece } from "logic/squares/piece";

const makeRotator = <T>(f: (rows: T[][], i: number, j: number) => T) => {
    return (rows: T[][]) => {
        return rows.map((row, i) => row.map(
            (_, j) => f(rows, i, i)
        ));
    }
}


// export const rotateCounterClockwise = makeRotator(
//     (rows: Piece[][], i: number, j: number) => rows[j][rows.length - i - 1]
// );


export const rotateCounterClockwise = <T>(rows: T[][]): T[][] => {
    return rows.map(
        (row, i) => row.map(
            (_, j) => rows[j][rows.length - i - 1]
        )
    );
};
export const rotateClockwise = <T>(rows: T[][]): T[][] => {
    return rows.map(
        (row, i) => row.map(
            (_, j) => rows[rows.length - j - 1][i]
        )
    );
};
export const rotate180 = <T>(rows: T[][]): T[][] => {
    return rows.map(
        (row, i) => row.map(
            (_, j) => rows[rows.length - i - 1][rows.length - j - 1]
        )
    )
}