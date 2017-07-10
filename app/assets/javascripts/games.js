//How do I show the ordinalized game number for this user in Game show page?

$(() => {
  bindGameClickHandlers()
})

const bindGameClickHandlers = () => {
  //User games index
  // $(document).on("click", ".see-games", (e) => {
  //   e.preventDefault();
  //   let userId = $(".see-games").data("userid");
  //   history.pushState(null, null, `/users/${userId}/games`);
  //   clearContent();
  //   getGames(userId);
  // });
  // Game show
  $(document).on("click", ".clickable-row", function(e)  {
    e.preventDefault();
    let url = $(this).data("href");
    history.pushState(null, null, `${url}`);
    clearContent();
    showGame(url);
  });
  // Game form POST from Index
  $(document).on('submit', 'form.in-index', function(e) {
    e.preventDefault();
    $.ajax({
      type: this.method,
      url: this.action,
      data: $(this).serialize(),
      success: function(data) {
        var game = data;
        addGameRow(game);
      }
    })
  })
  // Game Form post in New or Edit
  $(document).on('submit', 'form.standard', function(e) {
    e.preventDefault();
    $.ajax({
      type: this.method,
      url: this.action,
      data: $(this).serialize(),
      success: function(data) {
        var game = data;
        let url = `/games/${game.id}`;
        clearContent();
        showGame(url);
      }
    })
  })
  // Add game get
  // $(document).on("click",".add-game", (e) => {
  //   e.preventDefault();
  //   let userId = $(".add-game").data("userid");
  //   history.pushState(null, null, `/users/${userId}/games/new`);
  //   clearContent();
  //   getNewGame(userId);
  // });
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
  this.current_username = game.current_username
  this.game_number = game.game_number
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
  $('h3#table-heading').html(`${this.current_username}'s Games`)
  return gameHTML
}

const gameIndexStatic = function() {
  let emptyTable = `
  <h3 id="table-heading"></h3>
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

const noGameIndex = (username) => {
  gameIndexStatic(username);
  let noGames = `
  <div><p>No games.</p></div>
  `
  $('h3#table-heading').html(`${username}'s Games`)
  return $('.main-content').append(noGames)
}

const displayGames = (data) => {
  gameIndexStatic(data.username);
  data.forEach(game => {
    let newGame = new Game(game)
    let gameHTML = newGame.formatGameIndex()
    $('.game-rows').append(gameHTML)
  })
}

const getGames = (userId) => {
  $.ajax({
    method: 'get',
    url: `/users/${userId}/games.json`,
    success: function(data) {
      if (Object.keys(data).length === 2) {
        noGameIndex(data.username)
      } else {
        displayGames(data)
      }
    }
  });
}

const addGameRow = (game) => {
  clearForm();
  let newGame = new Game(game)
  let gameHTML = newGame.formatGameIndex()
  $('.game-rows').append(gameHTML)
}

const clearForm = () => {
  $('form.in-index').trigger('reset');
  $("input[type=submit]").removeAttr("disabled");
  $('a.show-form').trigger('click');
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
  <br>
  <ul>
    <li><strong>Date Played: </strong>${this.date_played}</li>
    <li><strong>Volley Total: </strong>${this.volley_total}</li>
    <li><strong>Location: </strong>${this.location.name}</li>
    <li><strong>Game Type: </strong>${this.game_type}</li>
    <li><strong>Distance: </strong>${this.distance}</li>
    <li><strong>Players: </strong>${this.played_with}</li>
  </ul>
  <br>
  <br>
  <a href="/games/${this.id}/edit" class="btn btn-primary edit-game">Edit Game</a>
  `
  return gameShowHTML
}

///////// NEW GAME FUNCTIONS//////////

// const getNewGame = (userId) => {
//   $.ajax({
//     method: 'get',
//     url: `/users/${userId}/games/new.json`,
//     success: function(data) {
//       console.log(data)
//       let newGameForm = newGameFormat()
//       $('.main-content').append(newGameForm);
//     }
//   })
// }
//
// const newGameFormat = () => {
//   let newGameForm = `
//     <h3>New Game Form</h3>
//   `
//   return newGameForm
// }
