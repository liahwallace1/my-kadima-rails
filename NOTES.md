Notes for Building My-Kadima

STEP 1
- generate models for:
  - USER
    - have username, email, and password
    - has many games (through game_players)
    - has many locations through games
  - GAME
    - has many players (through game_players)
    - belongs to a location
  - GAME_PLAYERS
    - Join table for games and users bc each game can have multiple players, and each player will play multiple games
    - Aliasing - when associated with a game, want a user to be called a player
  - LOCATION
    - has many games
    - has many players through games

  STEP 2 - CONTROLLERS AND ROUTES
  - SESSIONS CONTROLLER
    - login
    - logout
  - USERS CONTROLLER
    - create
    - edit username, email
    - delete account
  - GAMES CONTROLLER
    - ALL resources
    - when a new game gets created, it needs to add rows to the game_players join table and give the option of creating a new location, new turf type
  - LOCATIONS CONTROLLER
    - ALL resources


STEP 3
  ROUTES

STEP 4
  VIEWS

STEP 5
AUTHENTICATION WITH OMNIAUTH
