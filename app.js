const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const URL = require('./models/url.js')
const { urlValidator } = require('./lib/validator.js')
const { validationResult } = require('express-validator')
let root = 'https://pure-ocean-86993.herokuapp.com'
if (process.env.NODE_ENV !== 'production') {
  root = 'localhost:3000'
}

// const port = 3000
// 連線mongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shortURL', { useNewUrlParser: true, useCreateIndex: true })
const db = mongoose.connection


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.use('/', require('./routes/home.js'))
app.use('/url', require('./routes/url.js'))

app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log('web server is running', process.env.PORT)
})


