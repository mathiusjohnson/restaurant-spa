// const createAddToCart = function(menuItems) {
//   return `
//   <form action='/addToCart' method="POST">
//   <div class="flex-column">
//   <span class="your-order-summary"> Your Order </span>
//   <div class="item1">
//     <p>${menuItems.quantity} ${menuItems.name} ${menuItems.price}</p>
//     <p>${menuItems.quantity} ${menuItems.name} ${menuItems.price}</p>
//     <p>${menuItems.quantity} ${menuItems.name} ${menuItems.price}</p>
//   </div>
//   <div class="total-div">
//     <p class="subtotal"> Food & Beverage Subtotal </p>
//     <p class="tax"> GST </p>
//     <p class="total"> Total </p>
//     <p class="total-amt"> Total </p>
//     <p class="place-order"> PLACE ORDER </p>
//   </div>
// </div>
// </form>
// `;
// };

// const renderCart = function(items) {
//   for (const item of items) {
//     console.log("this is the item", item);
//     const cartHTML = createAddToCart(item);
//     $('.order-cart').append(cartHTML);
//   }
// };


// const loadCart = function() {
//   $
//   .get('/api/apiRoutes/addToCart')
//   .then((resp) => {
//     renderMenu(resp.entries);
//   });
// };

$(document).ready(function() {

  //On click of nav button, pulls up menu skeleton
  // $(".order-button").on('click', function(event) {
  //   event.preventDefault();
  //   console.log("this has been clicked!");
  //   loadCart();
  // });
});
