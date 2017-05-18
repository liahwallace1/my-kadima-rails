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
  $(document).on("click", "li a", function(e)  {
    e.preventDefault();
    let url = $(this).attr("href");
    history.pushState(null, null, `${url}`);
    clearContent();
    showLocation(url);
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
  let emptyTable = gameIndexStatic();
  $('.main-content').html(emptyTable);
  games.forEach((game) => {
    let newGame = new Game(game)
    let gameHTML = newGame.formatGameIndex()
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
    <h1>New Game Form</h1>
  `
  return newGameForm
}

//////// LOCATION OBJECT //////////

function Location(location) {
  this.id = location.id
  this.name = location.name
  this.city = location.city
  this.state = location.state
  this.lighting = location.lighting
  this.turf = location.turf
  this.games = location.games
}

//////// LOCATION INDEX FUNCTIONS //////////

const getLocations = () => {
  $.ajax({
    method: 'get',
    url: `/locations.json`,
    success: function(locations) {
      displayLocations(locations)
    }
  });
}

const displayLocations = (locations) => {
  let locationIndexHTML = locationIndexStatic();
  $('.main-content').html(locationIndexHTML);
  locations.forEach((location) => {
    let newLocation = new Location(location)
    let locationHTML = newLocation.formatLocationIndex()
    $('ul.locations').append(locationHTML)
  })
}

const locationIndexStatic = () => {
  let locationIndexHTML = `
  <h1>Locations</h1><br>
  <button class="btn btn-primary add-location">Add a Location</button><br><br>
  <ul class="locations">
  </ul>
  `
  return locationIndexHTML
}

Location.prototype.formatLocationIndex = function() {
  let locationHTML = `
  <li data-id="${this.id}">
    <a href="/locations/${this.id}"><strong>${this.name}</strong></a><br>
    ${this.city}, ${this.state}<br>
    <button class="btn btn-xs btn-default">Edit</button>
  </li><br>
  `
  return locationHTML
}

///////// LOCATION SHOW FUNCTIONS//////////

const showLocation = (url) => {
  $.ajax({
    method: 'get',
    url: `${url}.json`,
    success: function(location) {
    let newLocation = new Location(location);
    let locationShowHTML = newLocation.formatLocationShow();
    $('.main-content').append(locationShowHTML);
    }
  })
}

Location.prototype.formatLocationShow = function() {
  let locationShowHTML = `
  <h3>${this.name} Information</h3>
  <h4>${this.city}, ${this.state}</h4>
  <br>
  <p>Turf: ${this.turf}<p>
  <p>Lighting: ${this.lighting}</p>
  `
  return locationShowHTML
}
