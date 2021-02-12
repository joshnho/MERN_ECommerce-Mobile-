const {Product} = require('../models/Product')
const express = require('express')
const router = express.Router()

// Get list of all products
router.get('/', async (req, res) => {
    try {
        const productList = await Product.find()
        res.send(productList)   
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

// Create new product
router.post('/', async (req, res) => {
    try {
        let product = new Product({
            name: req.body.name,
            image: req.body.image,
            countInStock: req.body.countInStock
        })
        product = await product.save()
        res.status(201).send(product)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router