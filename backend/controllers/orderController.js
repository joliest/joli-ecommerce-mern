
import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'


// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = asyncHandler(async (req, res) => {
    const { 
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        itemPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice, 
    } = req.body;

    if (orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items');
    }

    const order = new Order({
        orderItems, 
        user: req.user._id,
        shippingAddress, 
        paymentMethod, 
        itemPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice, 
    })

    const createdOrder = await order.save()

    res.status(201).json({createdOrder})
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (order) {
        return res.json(order)
    }

    res.status(400);
    throw new Error('Order not found')
})