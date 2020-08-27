// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for (user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });
// });

$(document).ready(function() {
    $("#nav-button").click(function() {
        event.preventDefault();

        console.log("click");
        // $("html, body").animate({ scrollTop: $("#container").offset().top }, 1000); // Scroll individual element 100 pixels down
    });
    console.log("ready!");
});
