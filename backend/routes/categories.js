const {Category} = require('../models/Category')
const express = require('express')
const router = express.Router()


// Get list of all categories
router.get('/', async (req, res) => {
    try {
        const categoryList = await Category.find()
        res.send(categoryList)   
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

// Find category by ID
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        
        if (!category) return res.status(404).json({ msg: 'Category not found' })

        res.send(category)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Invalid Category ID')
    }
})

// Create a new category
router.post('/', async (req, res) => {
    try {
        let category = new Category({
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        })
        category = await category.save()
        res.send(category)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

// Update(edit) a category
router.put('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        }, { new: true })

        if (!category) return res.status(404).json({ msg: 'Category not found' })
        
        await category.save()
        res.send(category)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Invalid Category ID')
    }
})

// Delete a category by ID
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)

        // Return 404 status if category doesn't exist
        if (!category) return res.status(404).json({ message: 'Category not found' })
        
        await category.remove()
        res.status(200).json({ success: true, message: 'Successfully deleted' })
    } catch (err) {
        res.status(404).json({ success: false, message: 'Invalid Category ID' })
    }
})

module.exports = router