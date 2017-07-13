// $(() => {
//   bindStaticClickHandlers()
// })
//
// const bindStaticClickHandlers = () => {
//   //home page
//   $(".home").on("click", (e) => {
//     e.preventDefault();
//     let userId = $(".profile").data("userid");
//     history.pushState(null, null, `/`);
//     clearContent();
//     getHome();
//   });
// }
//
// const clearContent = () => {
//   $('.main-content').html("")
//   $('.messages').html("")
// }
//
// //////// HOME PAGE //////////
//
// const getHome = () => {
//   $.ajax({
//     method: 'get',
//     url: ``,
//     success: function() {
//       let homeHTML = homeFormat()
//       $('.main-content').append(homeHTML);
//     }
//   });
// }
//
//
// const homeFormat = () => {
//   let homeHTML =
//   `
//   <div>
//     <h3 class="text-center">Welcome to My Kadima - your Kadima game tracker!</h3>
//   </div>
//   <div>
//     <img src='/assets/mykadima-logo.png' class="home-img center-block" title="my-kadima-logo">
//   </div>
//   `
//   return homeHTML
// }
