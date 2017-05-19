$(() => {
  bindClickHandlers()
})

const bindClickHandlers = () => {
  //home page
  $(".home").on("click", (e) => {
    e.preventDefault();
    let userId = $(".profile").data("userid");
    history.pushState(null, null, `/`);
    clearContent();
    getHome();
  });
  // profile page
  $(".profile").on("click", (e) => {
    e.preventDefault();
    let userId = $(".profile").data("userid");
    history.pushState(null, null, `/users/${userId}`);
    clearContent();
    getProfile(userId);
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

// $.getJSON('', function() {
// let homeHTML = homeFormat()
// $('.main-content').append(homeHTML);
// })

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
  this.high_score_single_score = user.high_score_single_score
  this.high_score_single_partner = user.high_score_single_partner
  this.high_score_group_score = user.high_score_group_score
  this.high_score_group_partners = user.high_score_group_partners
  this.frequent_partner_name = user.frequent_partner_name
  this.frequent_location_name = user.frequent_location_name
  this.number_of_games = user.number_of_games
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
  <h3>${this.username}'s Player Profile</h3><br>
  <button class="btn btn-primary">Add a New Game</button>
  <h3>Your Stats:</h3><br>

  <p><strong>High Score for One-on-One Game: </strong>${this.high_score_single_score} volleys with Player ${this.high_score_single_partner}</p><br>

  <p><strong>High Score for Group Game: </strong>${this.high_score_group_score} volleys with Players ${this.high_score_group_partners}</p><br>

  <p><strong>Number of Games: </strong>${this.number_of_games}</p><br>

  <p><strong>Favorite Partner: </strong>${this.frequent_partner_name}</p><br>

  <p><strong>Favorite Location: </strong>${this.frequent_location_name}</p><br>
  <br>
  <br>
  <br>
  <button class="btn btn-warning">Edit User Profile</button>
  `
  return profileHTML
}
