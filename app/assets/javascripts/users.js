// $(() => {
//   bindUserClickHandlers()
// })
//
// const bindUserClickHandlers = () => {
//   // profile page
//   $(document).on("click", ".profile", (e) => {
//     e.preventDefault();
//     let userId = $(".profile").data("userid");
//     history.pushState(null, null, `/users/${userId}`);
//     clearContent();
//     getProfile(userId);
//   });
//
// }
//
//
// //////// USER OBJECT //////////
//
// function User(user) {
//   this.id = user.id
//   this.username = user.username
//   this.games = user.games
//   this.locations = user.locations
//   this.one_on_one_stat = user.one_on_one_stat
//   this.group_stat = user.group_stat
//   this.frequent_partner_name = user.frequent_partner_name
//   this.frequent_location_name = user.frequent_location_name
//   this.number_of_games = user.number_of_games
// }
//
// //////// USER SHOW FUNCTIONS //////////
//
// User.prototype.formatProfile = function() {
//   let profileHTML = `
//   <h3>${this.username}'s Player Profile</h3><br>
//   <a href="/users/${this.id}/games" class="btn btn-primary see-games">See My Games</a>
//   <h3>Your Stats:</h3>
//
//   <p id="high-score-single"><strong>High Score for One-on-One Game: </strong>${this.one_on_one_stat}</p><br>
//
//   <p id="high-score-multi"><strong>High Score for Group Game: </strong>${this.group_stat}</p><br>
//
//   <p><strong>Number of Games: </strong>${this.number_of_games}</p><br>
//
//   <p><strong>Favorite Partner: </strong>${this.frequent_partner_name}</p><br>
//
//   <p><strong>Favorite Location: </strong>${this.frequent_location_name}</p><br>
//   <br>
//   <br>
//   <br>
//   <a href="/users/${this.id}/edit" class="btn btn-warning edit-user" data-userid="${this.id}">Edit User Profile</a>
//   `
//   return profileHTML
// }
//
//
// const getProfile = (userId) => {
//   $.ajax({
//     method: 'get',
//     url: `/users/${userId}.json`,
//     success: function(user) {
//       let newUser = new User(user);
//       let profileHTML = newUser.formatProfile();
//       $('.main-content').append(profileHTML);
//     }
//   });
// }
