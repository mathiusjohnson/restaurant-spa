const createMenuItems = function (menuItems) {
return `
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
      <li><a href=""><i class="fas fa-minus"></i></a></li>
      <li><input type="number" required minlength=".5" maxlength="1" placeholder="00"></li>
      <li><a href=""><i class="fas fa-plus"></i></i></a></li>
      <li><button>Add to order</button>
      </li>
    </ul>
  </footer>
</article>
`
}

const renderMenu = function (items) {
  for (const item of items) {
    const menuHTML = createMenuItems(item);
    $('.menu-items-container').append(menuHTML);
  }
}



// const loadtweets = function() {
//   //Getting data using Jquery
//   $.getJSON('http://localhost:8080/tweets')
//     .then((tweets) => {
//       renderTweets(tweets);
//     })
//   }

const loadMenu = function() {
  $.getJSON('/menuItems')
    .then((items) => {
      renderMenu(items);
    })
}


$(document).ready(function(){
  loadMenu();

  //On click of category, filtering based on recieved list
  $(".nav-button").click(function(event) {
    event.preventDefault();
    loadMenu();

  });
})
