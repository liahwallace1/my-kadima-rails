$(() => {
  bindClickHandlers()
})

const bindClickHandlers = () => {
  $(".home").on("click", (e) => {
    e.preventDefault();
    let userId = $(".profile").data("userid");
    history.pushState(null, null, `/`);
    clearContent();
    getHome();
  });
  $(".profile").on("click", (e) => {
    e.preventDefault();
    let userId = $(".profile").data("userid");
    history.pushState(null, null, `/users/${userId}`);
    clearContent();
    getProfile(userId);
  });
  $(".see-games").on("click", (e) => {
    e.preventDefault();
    let userId = $(".see-games").data("userid");
    history.pushState(null, null, `/users/${userId}/games`);
    clearContent();
    getGames(userId);
  });
  $(document).on("click", ".clickable-row", function(e)  {
    e.preventDefault();
    let url = $(this).data("href");
    history.pushState(null, null, `${url}`);
    clearContent();
    showGame(url);
  });
  $(".add-game").on("click", (e) => {
    e.preventDefault();
    let userId = $(".add-game").data("userid");
    history.pushState(null, null, `/users/${userId}/games/new`);
    clearContent();
    getNewGame(userId);
  });
  $(".see-locations").on("click", (e) => {
    e.preventDefault();
    history.pushState(null, null, `/locations`);
    clearContent();
    getLocations();
  });
}

const clearContent = () => {
  $('.main-content').html("")
}

//////// HOME PAGE //////////

const getHome = () => {
  $.ajax({
    method: 'get',
    url: ``,
    success: function() {
      let homeHTML = homeFormat()
      $('.main-content').append(homeHTML);
    }
  });
}

const homeFormat = () => {
  let homeHTML =
  `
  <div>
    <h3 class="text-center">Welcome to My Kadima - your Kadima game tracker!</h3>
  </div>
  <div>
    <img src='/assets/mykadima-logo.png' class="home-img center-block" title="my-kadima-logo">
  </div>
  `
  return homeHTML
}


//////// USER OBJECT //////////

function User(user) {
  this.id = user.id
  this.username = user.username
  this.games = user.games
  this.locations = user.locations
}

//////// USER SHOW FUNCTIONS //////////

const getProfile = (userId) => {
  $.ajax({
    method: 'get',
    url: `/users/${userId}.json`,
    success: function(user) {
      let newUser = new User(user)
      let profileHTML = newUser.formatProfile()
      $('.main-content').append(profileHTML)
      displayProfile(user)
    }
  });
}

User.prototype.formatProfile = function() {
  let profileHTML = `
  <h1>${this.username}'s Profile</h1>
  `
  return profileHTML
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

/////// USER GAMES INDEX FUNCTIONS /////////

Game.prototype.formatIndex = function() {
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

const indexStatic = () => {
  let emptyTable = `
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
  return emptyTable
}

const noGameIndex = () => {
  let emptyTable = `
  <h3>Your Games</h3>
  <div><p>No games.</p></div>
  `
  return emptyTable
}

const displayGames = (games) => {
  let emptyTable = indexStatic();
  $('.main-content').html(emptyTable);
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
    let showHTML = newGame.formatShow();
    $('.main-content').append(showHTML);
    }
  })
}

Game.prototype.formatShow = function() {
  let showHTML = `
  <h3>Game Data</h3>
  `
  return showHTML
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
    <h1>New Game Form</h1>
  `
  return newGameForm
}
