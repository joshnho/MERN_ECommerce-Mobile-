const {Product} = require('../models/Product')
const express = require('express')
const { Category } = require('../models/Category')
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
    const category = await Category.findById(req.body.category)
    if (!category) return res.status(400).send('Invalid Category')

    try {
        let product = new Product({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured
        })
        product = await product.save()

        if (!product) return res.status(500).json({ msg: 'Product cannot be created' })

        res.status(201).send(product)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router