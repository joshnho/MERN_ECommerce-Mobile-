const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv/config')

// Enabling CORS
app.use(cors())
app.options('*', cors)

// Middlewares
app.use(bodyParser.json())
app.use(morgan('tiny'))

// Routes
const productsRouter = require('./routes/products')
const categoryRouter = require('./routes/categories')

const api = process.env.API_URL

app.use(`${api}/products`, productsRouter)
app.use(`${api}/categories`, categoryRouter)


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: 'E-shop'
}).then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((err) => {
        console.log(err)
    })

// Listen to port
app.listen(3000, () => {
    console.log('Server is running at https://localhost:3000')
})