
export  type RookStartPosition = 
|  'A1'// white, queen-side
|  'H1'// white, king-side
|  'A8'// black, queen-side
|  'H8'// black, king-side

export type CastlingPreclusions = Set<RookStartPosition>;

