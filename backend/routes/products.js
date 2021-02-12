const {Product} = require('../models/product')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const productList = await Product.find()
        res.send(productList)   
    } catch (err) {
        res.status(500).json({ error: err, success: false })
    }
})

router.post('/', async (req, res) => {
    try {
        const product = await new Product({
            name: req.body.name,
            image: req.body.image,
            countInStock: req.body.countInStock
        })

        product.save()

        res.status(201).json(product)
    } catch (err) {
        res.status(500).json({ error: err, success: false })
    }
})

module.exports = router