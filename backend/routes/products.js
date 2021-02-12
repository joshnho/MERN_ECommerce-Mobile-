const {Product} = require('../models/product')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const productList = await Product.find()

    if (!productList){
        res.status(500).json({ success: false })
    } else {
        res.send(productList)
    }
})

router.post('/', async (req, res) => {
    const product = await new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })
    
    product.save()

    if (!product){
        res.status(500).json({ success: false })
    } else {
        res.status(201).json(product)
    }
})

module.exports = router