const createOrders = function(orders) {
  return `<form method='/createCustomer' action="POST>
    <article class="order-items">
      <p class="name">Name: ${orders.name}, Order ID:  ${orders.id}</p>
      <p>Time Created: ${orders.order_date}</p>
    </article>
    <button id="select-order">Select to Update</button>
  </form>`;
};

const renderOrders = function(Orders) {
  const orderHTML = createOrders(Orders);
  $('#orders-container').append(orderHTML);
};

const loadOrders = function() {
  $
    .get('/api/createcustomer/')
    .then((resp) => {
      renderOrders(resp.customer[0]);
    });
};

const createCustomer = function(customer) {
  return `<form method='/createCustomer' action="POST">
  <article class="order-items">
      <p class="name">Name: ${customer.name}, Order ID:  ${customer.id}</p>
      <p>Phone Number: ${customer.phone_number}</p>
  </article>
  <button id="back-to-orders">Back to Orders</button>
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
    $('#customers-order').append(orderHTML);
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
    $('#sidenav').slideUp(500);
    $('.hero-image').slideUp(500);
    loadOrders();
  });


  $("#orders-container").on('click', '#select-order', function(event) {
    event.preventDefault();
    $(this).slideUp(500);
    loadCustomer();
    loadOrderItems();
  });

  $("#orders-container").on('click', '#back-to-orders', function(event) {
    event.preventDefault();
    $(this).slideUp(500);
    loadOrders();

  });  $('#customer-container').on('click', '#order-ready', function(event) {
    event.preventDefault();
    orderReadySMS();
  });
});
