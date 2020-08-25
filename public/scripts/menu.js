const createMenuItems = function(menuItems) {
  return `
<form method='/menuItems' action="POST">
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
        <li><input type="number" required minlength=".5" maxlength="1" placeholder="00"></li>
        <li><button>Add</button>
        </li>
      </ul>
    </footer>
  </article>
</form>
`;
};

const renderMenu = function(items) {
  for (const item of items) {
    console.log("this is the item", item);
    const menuHTML = createMenuItems(item);
    $('#menu-items-container').append(menuHTML);
  }
};

const loadMenu = function() {
  $
    .get('/api/apiRoutes/menuItems')
    .then((resp) => {
      renderMenu(resp.entries);
    });
};

$(document).ready(function() {
  // loadMenu();

  //On click of nav button, pulls up menu skeleton
  $("#nav-button").on('click', function(event) {
    event.preventDefault();
    console.log("this has been clicked!");
    loadMenu();
  });
});
