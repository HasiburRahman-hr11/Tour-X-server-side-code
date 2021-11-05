const { createNewOrder, getOrdersByUser, getSingleOrder, getAllOrders, deleteOrderById, updateOrder } = require('../controllers/orderControllers');

const router = require('express').Router();

// Create New Order
router.post('/api/orders/add', createNewOrder);

// Get Orders by userId
router.get('/api/orders/user/:userId', getOrdersByUser);


// Get Single Order
router.get('/api/orders/:id', getSingleOrder);


// Get All Orders
router.get('/api/orders', getAllOrders);


// Delete Order by Id
router.delete('/api/orders/:orderId', deleteOrderById);

// Update an Order
router.put('/api/orders/:id', updateOrder);


module.exports = router;