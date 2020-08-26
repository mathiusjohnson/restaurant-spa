// ---------- Create menu items


const createMenuItems = function(menuItems) {
  return `
<form method='/menu' action="POST">
  <article class="menu-items">
    <header class="name-of-item">
      <span class="name">${menuItems.name}</span>
    </header>
    <main class="max-width">
      <p class="tweeted-text break-long-words hover-blur">${menuItems.description}</p>
    </main>
    <footer class="menu-item-footer">
      <span class="price">${menuItems.price}</span>
      <ul class="icons">
        <li><input id="numOfItems${menuItems.id}" type="number" required minlength="1" maxlength="1" placeholder="0"></li>
        <li><button data-id=${menuItems.id} class="order-button">Add</button>
        </li>
      </ul>
    </footer>
  </article>
</form>
`;
};
const renderMenu = function(items) {
  for (const item of items) {
    const menuHTML = createMenuItems(item);
    $('#menu-items-container').append(menuHTML);
  }
};

const loadMenu = function() {
  $
    .get('/api/menu/')
    .then((resp) => {
      renderMenu(resp.entries);
    });
};


// -----------  ADDING TO THE CART
const createAddToCart = function(menuItems) {
  // console.log('menuItems', menuItems);
  return `
  <form action='/showCartPost' method="POST">
  <div class="flex-column">
  <div class="item1">
    <p>${menuItems.quantity} ${menuItems.name} ${menuItems.price}</p>
  </div>
</div>
</form>
`;
};

const createPlaceOrder = function() {
  return (`<div class="total-div">
    <p class="subtotal"> Food & Beverage Subtotal </p>
    <p class="tax"> GST </p>
    <p class="total"> Total </p>
    <p class="total-amt"> Total </p>
    <p class="place-order"> PLACE ORDER </p>
  </div>`);
};


const renderCart = function(items) {
  // console.log('items', items);
  loadCart();
  for (const item of items) {
    // console.log('item', item);
    const cartHTML = createAddToCart(item);
    $('.order-cart').prepend(cartHTML);
  }
  if ($('.order-cart .total-div').length === 0) {
    $('.order-cart').append(createPlaceOrder());
  }
};

const showCart = function(cartItems) {
  $
    .get('/api/showCart')
    .then((resp) => {
      console.log("response: ", resp);
      renderCart(resp.orderCart);
    });
};

const addCart = function(menuItem) {
  $
    .post('/api/addToCart', menuItem)
    .then((resp) => {
      console.log("this is menu item: ", menuItem);
      renderCart(resp.orderCart);
    });
};

const loadCart = function() {
  $
    .post('/api/showCartPost')
    .then((resp) => resp.orderCart);
};

// --------- adding a user to header

const createUser = function(user) {
  return `
<form action='/users' method='POST'>
<h3>${user.name}'s Order</h3>
</form>
`;
};

const renderUser = function(user) {
  const userHTML = createUser(user);
  $('#users-cart').append(userHTML);
};

const addUser = function() {
  $
    .post('/api/users')
    .then((resp) => {
      // console.log("response: ", resp);
      renderUser(resp.users[0]);
    });

};
const sendSMS = function() {
  $
    .post('/api/sendSMS')
    .then((resp) => resp.sendSMS);
};


$(document).ready(function() {
  // loadMenu();
  //On click of nav button, pulls up menu skeleton
  $("#nav-button").on('click', function(event) {
    event.preventDefault();
    loadMenu();
  });
  //On click listener for add to cart,
  $("#menu-items-container").on('click', ".order-button", function(event) {
    event.preventDefault();
    addUser();
    const textFieldID = `#numOfItems${event.target.dataset.id}`;
    console.log("text field id: ", textFieldID);
    const itemsToCart = $(textFieldID).val();
    console.log("items to cart: ", itemsToCart);
    //HARDCODED Quantit Data for menuItem instead of fetching from the page
    //event.target.dataset.id is getting the specific id of the add buttons of each menu option
    //yellow moong daal is id 1, channa paneer is id 2
    //debugger stops the code on the webpage when it reaches that point so we can mess around on the webpage and do things in the console like, event.target, event.target.dataset.id
    //quantity can be tackled in the same way, we need to read the .val of the textbox beside the addbutton
    //Whats the ID for the menu item, and read the textbox and get quantity number

    // debugger;
    const menuItem = { menuItemId: event.target.dataset.id, quantity: itemsToCart };
    console.log("value: ", event.target);
    addCart(menuItem);
    $('.order-cart').empty();
    showCart();
    $('.order-cart').on('click', '.place-order', function(event) {
      event.preventDefault();
      sendSMS();
    });
  });
});
