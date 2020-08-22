## Balkaran's VEGETARIAN Punjab Restaurant SPA

Hungry clients of this fictitious restaurant can visit its website, select one or more dishes and place an order for pick-up. They will receive a notification when their order is ready.

The restaurant and client both need to be notified since this app serves as an intermediary.

When an order is placed the restaurant receives the order via SMS. The restaurant can then specify how long it will take to fulfill it. Once they provide this information, the website updates for the client and also notifies them via SMS.

You can use a modern telecomm API service such as Twilio to implement SMS communication from the website to the client and restaurant.

## User Stories

1. As a customer, I want to see the menu options, pictures of food items, and price, because I want to choose what to eat (slideUp hero image, slideDown menu)
2. As a customer, I want to add food items to my order, because I am hungry, I am too lazy to cook, and I want it delivered now.
3. As a customer, I want to see my order list and total price of the order as I add new things to it, because I am a cheapo 
4. As a customer, I want to see suggestions based on items I have selected, because I am interested in trying new food (STRETCH)
5. As a customer, I want to be able to see my order history, because I like to remember what food I realllly like to eat (STRETCH)
5. As a customer, I want to be given an option to tip the restaurant, because I know they are putting their lives at risk everyday with covid19
6. As a customer, I want to be able to submit my order and see that it has been verified or confirmed by the restaurant
7. As a customer, I want to know when my food is ready or how long it will take

As a user, I shouldn't be able to do sql injection, because that's BAAADD

1. As an owner, I want to receive an SMS when an order is placed, because I need to make it fast (Twilio)
<!-- discuss how owner responds to SMS order -->
2. As an owner, I want to be able to tell the customer how long it will take for the food to be made/delivered
3. As an owner, I want to be able to send the customer a notification when their food is ready

## Nouns -> customers, menuSelections, orders?, 

## User Scenarios

1. Given that I'm on homepage, when I click on a category, then it will direct me to the section where I can see the food/drink items and price
2. Given that I'm on homepage, when I add food items to order, then it will show me what I have in my order and the total price, with an option to checkout (3-column layout)
3. Given that I'm on homepage, when I add items to my order, then I will see suggestions based on what I've ordered

## ERD
The user stories provide you with nouns (eg. user, posts, favourites)
Use these nouns/entities to build out your database (ie. tables are the nouns from the stories)
Routes
Once you know the resources that you'll have, write out the routes that you'll need to perform BREAD operations on those resources
Remember RESTful conventions (they make it much easier)

## Wireframes
Draw out the structure of your web pages
This will make it much easier to build out these pages later
This is also a great opportunity to get input from all of the team members
Design matters... however you are a developer, not a designer
Get inspiration from websites you visit

## User Login
Don't do it
do this instead
app.get('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/');
});

## Tech Choices
Back End: Node and Express
Front End: HTML, CSS, JS, jQuery, Bootstrap

## SPA

## Git
Use Git best practices (ask a mentor for clarification if you need it)
Use branches
DO NOT CODE ON MASTER
I repeat, do not code on master
Splitting up the Work
Horizontally - whole team working on front-end or back-end at the same time

Saturday - 12:30-1 scrum pst
Sunday - 12:30-1 scrum pst


## Communication
Make sure to communicate with your team members
Use Slack, iMessage, Google Hangouts, whatever... just make sure that everyone is on the same page
Github Projects
Github has a built-in project board (similar to a kanban board)

## Deployment
Decide if you want/need to deploy your application to the cloud
Ask a mentor for assistance/advice if your team decides to deploy

## Layout

1. food categories side nav bar (unordered list w/ links)
2. header (static background w/ Restaurant name & logo)
3. hero image (sliding up)
4. menu items (article w/ sections)
5. add to cart (jquery interactive form)
6. footer (social media icons)
