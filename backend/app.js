const express = require('express')
const app = express()

require('dotenv/config')
const api = process.env.API_URL

const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')

// Middlewares
app.use(bodyParser.json())
app.use(morgan('tiny'))

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: Number
})
const Product = mongoose.model('Product', productSchema)

app.get(`${api}/products`, async (req, res) => {
    const productList = await Product.find()

    if (!productList){
        res.status(500).json({success: false})
    } else {
        res.send(productList)
    }
})

app.post(`${api}/products`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })
    
    product.save().then((newProduct => {
        res.status(201).json(newProduct)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'E-shop'
})
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(3000, () => {
    console.log('Server is running at https://localhost:3000')
})