const { User } = require('../models/user')
const express = require('express')
const router = express.Router()

// Get all users
router.get('/', async (req, res) => {
    const userList = await User.find()

    if(!userList) return res.status(500).json({ success: false })
    res.send(userList)
})

// Create new user
router.post('/', async (req, res) => {
    try {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            passwordHash: req.body.passwordHash,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country
        })
        user = await user.save()

        if (!user) return res.status(400).send('User could not be created')
        res.send(user)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router