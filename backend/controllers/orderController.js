
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

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        }

        const updatedOrder = await order.save();

        res.json(updatedOrder)
    }

    res.status(400);
    throw new Error('Order not found')
})