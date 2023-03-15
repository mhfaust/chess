
export  type RookStartSquare = 
|  'a1'// white, queen-side
|  'h1'// white, king-side
|  'a8'// black, queen-side
|  'h8'// black, king-side

export type CastlingPreclusions = Set<RookStartSquare>;

