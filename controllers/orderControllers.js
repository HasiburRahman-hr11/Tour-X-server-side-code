const Order = require('../models/Order');

// Create New Order
exports.createNewOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();

        res.status(201).json(newOrder);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


// Get orders by userId 
exports.getOrdersByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const orders = await Order.find({
            userId: userId
        });

        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


// Get Single Order
exports.getSingleOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findOne({
            _id: id
        });
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


// Get All Orders
exports.getAllOrders = async (req, res) => {
    try {

        const orders = await Order.find();
        res.status(200).json(orders);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


// Delete Order by Id
exports.deleteOrderById = async (req, res) => {
    const { orderId } = req.params;
    try {

        await Order.findOneAndDelete({ _id: orderId });
        res.status(200).json({ success: true })

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


// Update an Order
exports.updateOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findOneAndUpdate(
            { _id: id },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}