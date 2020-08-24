const db = require('./db/index.js');

//
const menuItemsByCategory = function() {

    const queryString = SELECT menu_items.*,
        categories.name
    FROM menu_items
    JOIN categories ON category_id = categories.id
    WHERE category_id = 1;

    return db.query(queryString, queryParams)
        .then(res => res.rows);

}
