module.exports = function(router, database) {

    // GET - getMenuItems

    router.get('/menuItems', (req, res) => {
        database.getMenuItems(req.query)
            .then(menu_items => res.send({ menu_items }))
            .catch(e => {
                console.error(e);
                res.send(e)
            });
    });

    // POST REQUEST - addToCart
    router.post('/cart', (req, res) => {
        const customer_id = req.session.customer_id;
        database.addToCart({...req.body, customer_id })
            .then(order_items => {
                res.send(order_items);
            })
            .catch(e => {
                console.error(e);
                res.send(e)
            });
    });

    //GET - totalPrice

    router.get('/totalPrice', (req, res) => {
        database.totalPrice(req.query)
            .then(price => res.send({ price }))
            .catch(e => {
                console.error(e);
                res.send(e)
            });
    });

    //POST - placeOrder
    router.post('/placeOrder', (req, res) => {
        database.placeOrder({...req.body, customer_id })
            .then(orders => {
                res.send(orders);
            })
            .catch(e => {
                console.error(e);
                res.send(e)
            });
    });

    //POST - gstCalc
    router.post('/gstCalc', (req, res) => {
        // const userId = req.session.userId;
        database.gstCalc({...req.body, menu_item_id: menu_items.id })
            .then(price => {
                res.send(price);
            })
            .catch(e => {
                console.error(e);
                res.send(e)
            });
    });

    //POST - pstCalc
    router.post('/pstCalc', (req, res) => {
        // const userId = req.session.userId;
        database.pstCalc({...req.body, menu_item_id: menu_items.id })
            .then(price => {
                res.send(price);
            })
            .catch(e => {
                console.error(e);
                res.send(e)
            });
    });

    return router;
}