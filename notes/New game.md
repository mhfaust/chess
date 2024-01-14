/new-game
  screens: 
    1. how to play (remote or not)
    2. Select your opponent
    3. Assign white/black
    - determined by which state vars are set.
  component: back-button
    - unsets either opponent or white 
  component: select your opponent
  component: white-selector (name?)
  compnent: role presenter (who's white/black)
  state: {
    opponent: string
    white: string
  }