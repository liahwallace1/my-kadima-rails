// $("tr[data-link]").click(function() {
//   window.location = this.dataset.link
// })

// $("tr[data-link]").click(function() {
//   window.location = $(this).data("link")
// })

// TABLE ROW AS LINK //
jQuery(document).ready(function($) {
    $(".clickable-row").click(function() {
        window.location = $(this).data("href");
    });
});


// NAVBAR ACTIVE class //
$(".nav a").on("click", function(){
   $(".nav").find(".active").removeClass("active");
   $(this).parent().addClass("active");
});
