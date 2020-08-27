let menuEntries = [];
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
      <span class="price">$${convertCentsToDollars(menuItems.price)}</span>
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

const convertCentsToDollars = function(cents) {
  const dollars = cents / 100;
  return Math.round(dollars * 100) / 100;
    // return dollars.toFixed(2);
}
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
            menuEntries = resp.entries;
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
    <p>Quantity:${menuItems.quantity}</p>
    <p>${menuItems.name}</p>
    <p>$${(convertCentsToDollars(menuItems.price) * menuItems.quantity).toFixed(2)}</p>
  </div>
</div>
</form>
`;
};

const createPlaceOrder = function(items) {
  // console.log(items);
  let sum = 0;
  for (item of items) {
    sum += item.price * item.quantity;
  }
  // let sum = items[0].price * items[0].quantity;
  // console.log(sum, "sum");
  let gst = gstCalculator(sum);
  // console.log(gst, "gst");
  // debugger;
  let totalGst = gst + sum;
    return (`<div class="total-div">
    <p class="subtotal"> Food & Beverage Subtotal </p>
    <p class="total"> Total: $${(convertCentsToDollars(sum)).toFixed(2)} </p>
    <p class="tax"> GST: $${(convertCentsToDollars(gst)).toFixed(2)} </p>
    <p class="total-amt"> Total Including GST: $${(convertCentsToDollars(totalGst)).toFixed(2)} </p>
    <p class="place-order"> PLACE ORDER </p>
    <button class='clear-cart'> CLEAR CART </button>
  </div>`);
};


//GST CALCULATOR FOR CART
const gstCalculator = function (total) {
  const gst = total * 0.05;
  return gst;
}
// //I think it takes in two parameters, gst and total, total being the total of the cart
// const totalGstCalculator = function(gst) {
//   const totalGst = gst + total;
//   return totalGst;
// }

//RENDERS BOTH GST TOTAL SECTION AND MENU ITEMS
const renderCart = function(items) {
    // console.log('items', items);
    // loadCart();
    for (const item of items) {
        // console.log('item', item);
        //Holds HTML element for the menu items in the cart
        const itemCartHTML = createAddToCart(item);
        // console.log("this is itemCartHTML:", itemCartHTML);
        $('.order-cart').prepend(itemCartHTML);
      }
      //Renders the createPlaceOrder for the menu
      if ($('.total-div').length === 0) {
        //Holds HTML element for the totals
        const totalCartHTML = createPlaceOrder(items);
        // console.log(totalCartHTML);

        // console.log("this is totalCartHTML:", totalCartHTML);
        $('.total-cart').append(totalCartHTML);
    } else {
      const totalCartHTML = createPlaceOrder(items);
      $('.total-div').replaceWith(totalCartHTML);

    }
};

const showCart = function() {
    $
        .get('/api/showCart')
        .then((resp) => {
            // console.log("response: ", resp);
            $('.order-cart').empty();
            renderCart(resp.orderCart);
        });
};

const addCart = function(menuItem) {
    $
        .post('/api/addToCart', menuItem)
        .then(showCart);
};

//Clearing the cart
const clearCart = function() {
  $
      .post('/api/clearCart')
      .then(showCart);
};

// const loadCart = function() {
//     $
//         .post('/api/showCartPost')
//         .then((resp) => resp.orderCart);
// };

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

// const addUser = function() {
//     $
//         .post('/api/users')
//         .then((resp) => {
//             // console.log("response: ", resp);
//             renderUser(resp.users[0]);
//         });

// };

$(document).ready(function() {
    // loadMenu();
    //On click of nav button, pulls up menu skeleton
    $("#nav-button").on('click', function(event) {
        event.preventDefault();
        $('.hero-image').slideUp(500);
        if (menuEntries.length === 0) {
          loadMenu();
        }
    });
    //On click listener for add to cart,
    $("#menu-items-container").on('click', ".order-button", function(event) {
        event.preventDefault();
        // addUser();
        const textFieldID = `#numOfItems${event.target.dataset.id}`;
        // console.log("text field id: ", textFieldID);
        const itemsToCart = $(textFieldID).val();
        // console.log("items to cart: ", itemsToCart);

        //HARDCODED Quantit Data for menuItem instead of fetching from the page
        //event.target.dataset.id is getting the specific id of the add buttons of each menu option
        //yellow moong daal is id 1, channa paneer is id 2
        //debugger stops the code on the webpage when it reaches that point so we can mess around on the webpage and do things in the console like, event.target, event.target.dataset.id
        //quantity can be tackled in the same way, we need to read the .val of the textbox beside the addbutton
        //Whats the ID for the menu item, and read the textbox and get quantity number

        // debugger;
        const menuItem = { menuItemId: event.target.dataset.id, quantity: itemsToCart };
        // debugger
        // console.log("value: ", event.target);
        addCart(menuItem);
        // $('.order-cart').empty();
        // showCart();
    });

    $("#total-cart").on('click', '.clear-cart', function(event) {
      event.preventDefault();
      console.log("Hey this is the clear cart button");
      clearCart();
  });
});
