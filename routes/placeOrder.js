const express = require('express');
const router = express.Router();

module.exports = (db) => {
    router.post('/placeOrder', (req, res) => {
        // const id = req.params.id
        const id = 1;
        db
            .query(`
            INSERT INTO orders
              (id, customer_id, order_date)
            VALUES
              ($1, $2, $3) returning * ;`, [id])
            .then(data => {
                const entries = data.rows;
                res.json({ entries });
            });
    });
    return router;
};

//POST - placeOrder
router.post('/placeOrder', (req, res) => {
    database.placeOrder({...req.body, customer_id })
        .then(orders => {
            orders = calcTotalSales(orders);
            res.send(orders);
        })
        .catch(e => {
            console.error(e);
            res.send(e);
        });
});

const queryString = ;
return db.query(queryString)
    .then(res => res.rows);