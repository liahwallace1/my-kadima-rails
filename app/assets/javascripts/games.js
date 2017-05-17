$(() => {
  bindClickHandlers()
})

const bindClickHandlers = () => {
  $(".see-games").on("click", (e) => {
    e.preventDefault();
    history.pushState(null, null, "***username***/games");
    getGames();
  })
}

const getGames = () => {
  fetch(`/users/***id***/posts.json`)
  .then((res) => res.json())
  .then(data => {
    $('#main-content').html("")
    data.forEach((game) => {
      let newGame = new Game(game)
      let gameHTML = newGame.formatIndex()
      $('#main-content').append(gameHTML)
    })
  })
}

function Game(game) {
  this.id = game.id
  this.date_played = game.date_played
  this.distance = game.distance
  this.game_type = game.game_type
  this.volley_total = game.volley_total
  this.location = game.location
  this.played_with = game.played_with
}

Game.prototype.formatIndex = function() {
  //can get game id for link with ${this.id}
  let gameHTML = `
    <tr class="clickable-row" data-href="<%= game_path(game) %>">
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
