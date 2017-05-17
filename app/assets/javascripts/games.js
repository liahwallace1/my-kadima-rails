$(() => {
  bindClickHandlers()
})

const bindClickHandlers = () => {
  $(".see-games").on("click", (e) => {
    e.preventDefault();
    console.log("hello")
  })
}

const getGames = () => {
  fetch()
}

function Game(game) {
  this.id = game.id
  this.date_played = game.date_played
  this.distance = game.distance
  this.game_type = game.game_type
  this.volley_total = game.volley_total
  this.location_id = game.location_id
}
