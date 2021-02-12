const express = require('express')
const app = express()

require('dotenv/config')
const api = process.env.API_URL
const productsRouter = require('./routes/products')

const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')

// Middlewares
app.use(bodyParser.json())
app.use(morgan('tiny'))

app.use(`${api}/products`, productsRouter)

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