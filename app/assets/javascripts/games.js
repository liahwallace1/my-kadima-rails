$(() => {
  bindGameClickHandlers()
})

const bindGameClickHandlers = () => {
  //User games index
  $(".see-games").on("click", (e) => {
    e.preventDefault();
    let userId = $(".see-games").data("userid");
    history.pushState(null, null, `/users/${userId}/games`);
    clearContent();
    gameIndexStatic();
    getGames(userId);
  });
  // Game show
  $(document).on("click", ".clickable-row", function(e)  {
    e.preventDefault();
    let url = $(this).data("href");
    history.pushState(null, null, `${url}`);
    clearContent();
    showGame(url);
  });
  // Add game
  $(".add-game").on("click", (e) => {
    e.preventDefault();
    let userId = $(".add-game").data("userid");
    history.pushState(null, null, `/users/${userId}/games/new`);
    clearContent();
    getNewGame(userId);
  });
}



//////// GAME OBJECT //////////

function Game(game) {
  this.id = game.id
  this.date_played = game.date_played
  this.distance = game.distance
  this.game_type = game.game_type
  this.volley_total = game.volley_total
  this.location = game.location
  this.played_with = game.played_with
  this.current_user_name = game.current_user_name
}

/////// USER GAMES INDEX FUNCTIONS /////////

Game.prototype.formatGameIndex = function() {
  let gameHTML = `
    <tr class="clickable-row" data-href="/games/${this.id}">
      <td>${this.date_played}</td>
      <td>${this.location.name}</td>
      <td>${this.game_type}</td>
      <td>${this.distance}</td>
      <td>${this.volley_total}</td>
      <td>${this.played_with}</td>
    </tr>
  `
  return gameHTML
}

const gameIndexStatic = () => {
  let emptyTable = `
  <h3>${this.current_user_name}'s Games</h3>
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Date</th>
            <th>Location</th>
            <th>Game Type</th>
            <th>Distance</th>
            <th>Volley Count</th>
            <th>Players</th>
          </tr>
        </thead>
        <tbody class="game-rows">
      </table>
    </div>
  `
  return $('.main-content').html(emptyTable);
}

const noGameIndex = () => {
  let noGames = `
  <div><p>No games.</p></div>
  `
  return $('.main-content').append(noGames)
}

const displayGames = (games) => {


  games.forEach((game) => {
    let newGame = new Game(game)
    let gameHTML = newGame.formatGameIndex()
    $('.game-rows').append(gameHTML)
  })
}

const getGames = (userId) => {
  // fetch(`/users/${userId}/games.json`)
  //   .then(res => console.log(res))
  $.ajax({
    method: 'get',
    url: `/users/${userId}/games.json`,
    success: function(games) {
      if (games.length === 0) {
        noGameIndex()
      } else {
        displayGames(games)
      }
    }
  });
}
///////// GAME SHOW FUNCTIONS//////////

const showGame = (url) => {
  $.ajax({
    method: 'get',
    url: `${url}.json`,
    success: function(game) {
    let newGame = new Game(game);
    let gameShowHTML = newGame.formatGameShow();
    $('.main-content').append(gameShowHTML);
    }
  })
}

Game.prototype.formatGameShow = function() {
  let gameShowHTML = `
  <h3>Game Data</h3>
  `
  return gameShowHTML
}

///////// NEW GAME FUNCTIONS//////////

const getNewGame = (userId) => {
  $.ajax({
    method: 'get',
    url: `/users/${userId}/games/new.json`,
    success: function(data) {
      console.log(data)
      let newGameForm = newGameFormat()
      $('.main-content').append(newGameForm);
    }
  })
}

const newGameFormat = () => {
  let newGameForm = `
    <h3>New Game Form</h3>
  `
  return newGameForm
}
