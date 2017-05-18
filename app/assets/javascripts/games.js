$(() => {
  bindClickHandlers()
})

const bindClickHandlers = () => {
  $(".see-games").on("click", (e) => {
    e.preventDefault();
    let userId = $(".see-games").data("userid");
    $('#main-content').html("");
    // history.pushState(null, null, `/users/${userId}/games`);
    getGames(userId);
  })
  $(document).on("click", ".clickable-row", function(e)  {
    e.preventDefault();
    let id = $(this).data("id");
    // history.pushState(null, null, `games/${id}`);
    $('#main-content').html("");
    showGame(id);
  })
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
}

/////// INDEX FUNCTIONS /////////

Game.prototype.formatIndex = function() {
  let gameHTML = `
    <tr class="clickable-row" data-id="${this.id}">
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

const indexStatic = () => {
  let indexStatic = `
  <h3>Your Games</h3>
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
  return indexStatic
}

const objIsEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

const noGameIndex = () => {
  let indexStatic = `
  <h3>Your Games</h3>
  <div><p>No games.</p></div>
  `
  return indexStatic
}

const displayGames = (games) => {
  let emptyTable = indexStatic();
  $('#main-content').html(emptyTable);
  games.forEach((game) => {
    let newGame = new Game(game)
    let gameHTML = newGame.formatIndex()
    $('.game-rows').append(gameHTML)
  })
}

const getGames = (userId) => {
  $.ajax({
    method: 'get',
    url: `/users/${userId}/games.json`,
    success: function(games) {
      $("#main-content").html(games)
      // if (objIsEmpty(games)) {
      //   noGameIndex()
      // } else {
      //   displayGames(games)
      // }
    }
  });
}
/////////SHOW FUNCTIONS//////////

const showGame = (id) => {

  fetch(`/games/${id}.json`)
  .then((res) => res.json())
  .then(game => {
    let newGame = new Game(game)
    let showHTML = newGame.formatShow()
    $('#main-content').append(showHTML)
  })
}

Game.prototype.formatShow = function() {
  let showHTML = `
  <h3>Game Data</h3>
  `
  return showHTML
}
