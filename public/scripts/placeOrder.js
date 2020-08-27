$(document).ready(function() {
            // renderTweets(data)
            // getMenuItems();

            //display menu items

            //create temporary order or save cart in local storage - when user is ready to submit, then store in db.

            $('form').submit(function(event) {
                event.preventDefault(); //prevents the default submit behavior
                $.ajax({
                    method: "POST",
                    url: "/placeOrder",
                    data: {}, //populate empty object with values from cart which will be sent to backend//$(this).serialize() //turns form data into query string - if you don't want to use serialize then make your own object here to send to back-end - need to double check body parser
                }).then(function() {
                    getMenuItems();
                    $('#tweet-text').val('');
                })
            });
