const createCustomer = function(customer) {
  return `<form method='/createCustomer' action="POST">
  <article class="order-items">
      <p class="name">Name: ${customer.name} </p>
      <p>Phone Number: ${customer.phone_number}</p>
  </article>
  <button id="order-ready">Order Ready</button>
</form>`;
};

const renderCustomer = function(customers) {
  const customerHTML = createCustomer(customers);
  $('#customer-container').append(customerHTML);
};

const loadCustomer = function() {
  $
    .get('/api/createcustomer/')
    .then((resp) => {
      renderCustomer(resp.customer[0]);
    });
};

const createOrderItems = function(orders) {
  return `
<form method='/orders' action="POST">
  <article class="order-items">
      <span class="name">${orders.name}: ${orders.quantity} orders</span>
  </article>
</form>
`;
};

const renderOrderItems = function(orders) {
  for (const order of orders) {
    const orderHTML = createOrderItems(order);
    $('#order-customers-container').append(orderHTML);
  }
};

const loadOrderItems = function() {
  $
    .get('/api/createOrders/')
    .then((resp) => {
      renderOrderItems(resp.orders);
    });
};

const orderReadySMS = function() {
  $
    .post('/api/orderReady')
    .then((resp) => resp.orderReady);
};

$(document).ready(function() {
  // loadMenu();
  //On click of nav button, pulls up menu skeleton
  $("#admin-login").on('click', function(event) {
    event.preventDefault();
    $(this).slideUp(500);
    $('#customer-login').slideUp(500);
    $('#nav-button').slideUp(500);
    $('#sidenav').slideUp(50);
    loadCustomer();
    loadOrderItems();
  });
  $('#customer-container').on('click', '#order-ready', function(event) {
    event.preventDefault();
    orderReadySMS();
  });
});
