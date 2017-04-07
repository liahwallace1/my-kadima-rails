// $("tr[data-link]").click(function() {
//   window.location = this.dataset.link
// })

// $("tr[data-link]").click(function() {
//   window.location = $(this).data("link")
// })

jQuery(document).ready(function($) {
    $(".clickable-row").click(function() {
        window.location = $(this).data("href");
    });
});
