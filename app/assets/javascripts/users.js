$(() => {
  bindUserClickHandlers()
})

const bindUserClickHandlers = () => {
  // profile page
  $(document).on("click", ".profile", (e) => {
    e.preventDefault();
    let userId = $(".profile").data("userid");
    history.pushState(null, null, `/users/${userId}`);
    clearContent();
    getProfile(userId);
  });
  // $(document).on("click", "button.edit-user", () => {
  //   let userId = $("button.edit-user").data("userid");
  //   history.pushState(null, null, `/users/${userId}/edit`);
  //   clearContent();
  //   getEditUser(userId);
  // });
}


//////// USER OBJECT //////////

function User(user) {
  this.id = user.id
  this.username = user.username
  this.games = user.games
  this.locations = user.locations
  // this.high_score_single_score = user.high_score_single_score
  // this.high_score_single_partner = user.high_score_single_partner
  // this.high_score_group_score = user.high_score_group_score
  // this.high_score_group_partners = user.high_score_group_partners
  this.one_on_one_stat = user.one_on_one_stat
  this.group_stat = user.group_stat
  this.frequent_partner_name = user.frequent_partner_name
  this.frequent_location_name = user.frequent_location_name
  this.number_of_games = user.number_of_games
}

//////// USER SHOW FUNCTIONS //////////

User.prototype.formatProfile = function() {
  let profileHTML = `
  <h3>${this.username}'s Player Profile</h3><br>
  <button class="btn btn-primary add-game" data-userid="${this.id}">Add a New Game</button>
  <h3>Your Stats:</h3>

  <p id="high-score-single"><strong>High Score for One-on-One Game: </strong>${this.one_on_one_stat}</p><br>

  <p id="high-score-multi"><strong>High Score for Group Game: </strong>${this.group_stat}</p><br>

  <p><strong>Number of Games: </strong>${this.number_of_games}</p><br>

  <p><strong>Favorite Partner: </strong>${this.frequent_partner_name}</p><br>

  <p><strong>Favorite Location: </strong>${this.frequent_location_name}</p><br>
  <br>
  <br>
  <br>
  <button class="btn btn-warning edit-user" data-userid="${this.id}">Edit User Profile</button>
  `
  return profileHTML
}

// User.prototype.formatHighGameSingle = function() {
//   let text = ""
//   if (this.high_score_single_score) {
//     text = `<strong>High Score for One-on-One Game: </strong>${this.high_score_single_score} volleys with Player ${this.high_score_single_partner}`
//   } else {
//     text = `<strong>High Score for One-on-One Game: </strong>No one-on-one games yet!`
//   }
//   return $('#high-score-single').html(text)
// }
//
// User.prototype.formatHighGameMulti = function() {
//   let text = ""
//   if (this.high_score_group_score) {
//     text = `<strong>High Score for Group Game: </strong>${this.high_score_group_score} volleys with Players ${this.high_score_group_partners}`
//   } else {
//     text = `<strong>High Score for Group Game: </strong>No multi-player games yet!`
//   }
//   return $('#high-score-multi').html(text)
// }

const getProfile = (userId) => {
  $.ajax({
    method: 'get',
    url: `/users/${userId}.json`,
    success: function(user) {
      let newUser = new User(user);
      let profileHTML = newUser.formatProfile();
      $('.main-content').append(profileHTML);
    }
  });
}

//////// USER EDIT FUNCTIONS //////////

// const getEditUser = (userId) => {
//   $.ajax({
//     method: 'get',
//     url: `/users/${userId}/edit.json`,
//     success: function(user) {
//     let newUser = new User(user);
//     let editHTML = newUser.formatEditPage();
//     $('.main-content').append(editHTML);
//     }
//   });
// }
//
// User.prototype.formatEditPage = function() {
//   let editHTML = `
//   <h3>Edit your MyKadima account:</h3><br>
//   `
//   return editHTML
// }
