const {Product} = require('../models/Product')
const express = require('express')
const { Category } = require('../models/Category')
const router = express.Router()

// Get list of all products (can pass query params to filter search by category ID)
router.get('/', async (req, res) => {
    try {
        const categories = req.query.categories ? { category: req.query.categories.split(',') } : {}

        const productList = await Product.find(categories).populate('category')

        if (!productList) return res.status(500).json({ success: false })

        res.send(productList)   
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

// Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category')

        if (!product) return res.status(500).json({ success: false })

        res.send(product)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

// Update a product by ID
router.put('/:id', async (req, res) => {
    const category = await Category.findById(req.body.category)
    if (!category) return res.status(400).send('Invalid Category')
    
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, {
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
        }, { new: true })

        if (!product) return res.status(500).json({ msg: 'Product cannot be udpated' })
        
        await product.save()
        res.send(product)
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

// Delete a product by ID
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        // Return 404 status if category doesn't exist
        if (!product) return res.status(404).json({ message: 'Product not found' })
        
        await product.remove()
        res.status(200).json({ success: true, message: 'Successfully deleted' })
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

// Get featured products
// router.get('/get/featured', async (req, res) => {
//     try {
//         const products = await Product.find({ isFeatured: true })
//         if (!products) return res.status(500).json({ success: false })
//         res.send(products)
//     } catch (err) {
//         console.log(err.message)
//         res.status(500).send('Server Error')
//     }
// })

router.get('/get/featured/:count', async (req, res) => {
    try {
        const products = await Product.find({ isFeatured: true }).limit(+req.params.count)
        if (!products) return res.status(500).json({ success: false })
        res.send(products)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})




// ----For admin use----

// Get number of products listed
router.get('/get/count', async (req, res) => {
    try {
        const productCount = await Product.countDocuments((count) => count)
        if (!productCount) return res.status(500).json({ success: false })
        res.send({
            productCount: productCount
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router